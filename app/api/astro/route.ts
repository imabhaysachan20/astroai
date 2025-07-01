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


    const mockChart = {
      lagna: 'Cancer',
      moonSign: 'Gemini',
      sunSign: 'Taurus',
      currentDasha: 'Mercury → Rahu',
    }


    const prompt = `
You are a professional Vedic astrologer. Based on the birth chart and planetary placements below, provide a focused reading about the topic: ${topic}.

Name: ${name}
Date of Birth: ${dob}
Time of Birth: ${tob}
Place of Birth: ${place}
Latitude: ${lat}
Longitude: ${lng}
Timezone: ${timezone}
Lagna: ${mockChart.lagna}
Moon Sign: ${mockChart.moonSign}
Sun Sign: ${mockChart.sunSign}
Current Mahadasha: ${mockChart.currentDasha}

Instructions:
- Provide symbolic but insightful guidance.
- Reference specific placements if needed.
- Avoid clichés.
- Keep the tone mystical but helpful.
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
