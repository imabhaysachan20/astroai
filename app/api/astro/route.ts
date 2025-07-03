import { prompts } from '@/app/utils/prompts'
import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

import OpenAI from 'openai'
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
})

export async function POST(req: NextRequest) {
  try {
    const { name, dob, tob, place, topic, lat, lng, timezone } = await req.json()

    if (!name || !dob || !tob || !place || !topic || !lat || !lng || !timezone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
const vedicApiRes = await axios.post(
      'https://swish-ep-api.onrender.com/vedic-chart',
      {
        date:dob,
        time:tob,
        timezone:timezone,
        latitude:lat,
        longitude:lng,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const chartData = vedicApiRes.data
    console.log(chartData)

    // Type guards for chartData
    type ChartData = {
      ascendant: { sign: string };
      moon_nakshatra: string;
      current_dasha: { current: string; ends: string };
      planetary_positions: Record<string, { degree: number; sign: string; house: number }>;
    };
    const safeChartData = chartData as ChartData;

    // Type for prompts
    type PromptKeys = keyof typeof prompts;
    const safeTopic = topic as PromptKeys;

    const prompt = `
You are a kind, wise, and friendly astrologer speaking to someone who knows nothing about astrology.
They just want simple, clear, and encouraging guidance about their career, based on their astrological chart.
Your tone should be warm, approachable, and easy to understand — no technical jargon. Use relatable language, sprinkle in a few appropriate emojis, and make it fun and engaging to read.
Focus on the topic they are curious about: *${topic}*.  


Here are their birth details:
- Name: ${name}
- Date of Birth: ${dob}
- Time of Birth: ${tob}
- Place of Birth: ${place}

Here is the astrological chart data:
- Ascendant Sign: ${safeChartData.ascendant.sign}
- Moon Nakshatra: ${safeChartData.moon_nakshatra}
- Current Mahadasha: ${safeChartData.current_dasha.current} (ends: ${safeChartData.current_dasha.ends})
- Planetary Positions:
${Object.entries(safeChartData.planetary_positions).map(
  ([planet, pos]) => `  • ${planet}: ${pos.degree}° ${pos.sign} (House ${pos.house})`
).join('\n')}

${prompts[safeTopic]}

`.trim()

    console.log(prompt)
    // STEP 3: Call OpenAI (GPT-4o or GPT-4)
    const response = await openai.chat.completions.create({
      model: 'gpt-4o', // or 'gpt-4'
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.8,
    })

    const reading = response.choices[0].message.content

    return NextResponse.json({ reading })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
