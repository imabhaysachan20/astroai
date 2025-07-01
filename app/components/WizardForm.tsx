import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronLeft, ChevronRight, Star, Heart, TrendingUp, Crown, Users } from 'lucide-react';
import useDebounce from '../utils/useDebounded';

interface FormData {
  fullName: string;
  gender: string;
  dateOfBirth: string;
  lat:string,
  lng:string,
  timezone:string
  timeOfBirth: string;
  birthplace: string;
  focusArea: string;
}

const WizardForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    gender: '',
    dateOfBirth: '',
    timeOfBirth: '',
    birthplace: '',
    lat:"",
    lng:"",
    timezone:"",
    focusArea: ''
  });

  const [suggestions, setSuggestions] = useState<any[]>([]);
const debouncedSearch = useDebounce(formData.birthplace, 300);

  useEffect(() => {
  const searchCities = async () => {
    if (!debouncedSearch) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(`/api/search-city?q=${debouncedSearch}`);
      const data = await res.json();
      if (suggestions.length>0 && suggestions[0]=="null") {
        return;
      }
      setSuggestions(data?.hits || []);
    } catch (error) {
      console.error('City search failed', error);
    }
  };

  searchCities();
}, [debouncedSearch]);

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const totalSteps = 4;

  const focusOptions = [
    { id: 'love', label: 'Love & Relationships', icon: Heart, color: 'from-pink-500 to-rose-500' },
    { id: 'career', label: 'Career & Success', icon: TrendingUp, color: 'from-blue-500 to-indigo-500' },
    { id: 'wealth', label: 'Wealth & Finance', icon: Crown, color: 'from-gold-500 to-yellow-500' },
    { id: 'billionaire', label: 'Billionaire Potential', icon: Star, color: 'from-purple-500 to-violet-500' },
    { id: 'compatibility', label: 'Compatibility', icon: Users, color: 'from-green-500 to-emerald-500' }
  ];

  const updateFormData = (field: keyof FormData, value: string) => {
    
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    
      
    console.log(formData)
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {};

    switch (step) {
      case 1:
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.gender) newErrors.gender = 'Please select your gender';
        break;
      case 2:
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData.timeOfBirth) newErrors.timeOfBirth = 'Time of birth is required';
        break;
      case 3:
        if (!formData.birthplace.trim()) newErrors.birthplace = 'Birthplace is required';
        break;
      case 4:
        if (!formData.focusArea) newErrors.focusArea = 'Please select a focus area';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    
    try {
      // Map frontend fields to backend expected keys
      const payload = {
        name: formData.fullName,
        dob: formData.dateOfBirth,
        tob: formData.timeOfBirth,
        place: formData.birthplace,
        topic: formData.focusArea,
      };
      const response = await axios.post('/api/astro', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log(response)
        // Handle successful submission
        console.log('Form submitted successfully');
        
        // You can redirect or show success message here
      } else {
        console.error('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-slide-up">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={(e) => updateFormData('fullName', e.target.value)}
                className={`w-full text-gray-800 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-mystical-500 focus:border-mystical-500 transition-colors ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Gender</label>
              <div className="grid grid-cols-2 gap-4">
                {['Male', 'Female'].map((gender) => (
                  <label
                    key={gender}
                    className={`flex items-center text-gray-500 justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      formData.gender === gender.toLowerCase()
                        ? 'border-mystical-500 bg-mystical-50 text-mystical-700'
                        : 'border-gray-300 hover:border-mystical-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={gender.toLowerCase()
                      }
                      checked={formData.gender === gender.toLowerCase()}
                      onChange={(e) => updateFormData('gender', e.target.value)}
                      className="sr-only"
                    />
                    <span className="font-medium">{gender}</span>
                  </label>
                ))}
              </div>
              {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-slide-up">
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
                className={`w-full text-gray-800 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-mystical-500 focus:border-mystical-500 transition-colors ${
                  errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
            </div>

            <div>
              <label htmlFor="timeOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                Time of Birth (24-hour format)
              </label>
              <input
                type="time"
                id="timeOfBirth"
                value={formData.timeOfBirth}
                onChange={(e) => updateFormData('timeOfBirth', e.target.value)}
                className={`w-full text-gray-800 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-mystical-500 focus:border-mystical-500 transition-colors ${
                  errors.timeOfBirth ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.timeOfBirth && <p className="text-red-500 text-sm mt-1">{errors.timeOfBirth}</p>}
              <p className="text-sm text-gray-500 mt-1">
                Exact time is crucial for accurate predictions
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-slide-up">
            <div>
              <label htmlFor="birthplace" className="block text-sm font-medium text-gray-700 mb-2">
                Place of Birth
              </label>
              <input
                type="text"
                id="birthplace"
                value={formData.birthplace}
                onChange={(e) => updateFormData('birthplace', e.target.value)}
                className={`w-full text-gray-800 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-mystical-500 focus:border-mystical-500 transition-colors ${
                  errors.birthplace ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., Mumbai, India"
              />
              {suggestions.length > 0 && (
  <ul className="mt-2 bg-white border rounded-xl shadow-sm max-h-48 overflow-y-auto">
    {suggestions.map((city) => (
      <li
        key={city.id}
        onClick={() => {
          updateFormData('birthplace', `${city.city}, ${city.country}`);
          updateFormData('lat',city.lat);
          updateFormData('lng',city.lng);
          updateFormData('timezone',city.timezone);
          setSuggestions([])
          
        
        }}
        className="px-4 py-2 hover:bg-mystical-100 cursor-pointer text-sm text-gray-700"
      >
        {city.city}, {city.country}
      </li>
    ))}
  </ul>
)}
              {errors.birthplace && <p className="text-red-500 text-sm mt-1">{errors.birthplace}</p>}
              <p className="text-sm text-gray-500 mt-1">
                Enter city and country for accurate calculations
              </p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 animate-slide-up">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                What would you like to know about?
              </label>
              <div className="grid grid-cols-1 gap-3">
                {focusOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      formData.focusArea === option.id
                        ? 'border-mystical-500 bg-mystical-50'
                        : 'border-gray-300 hover:border-mystical-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="focusArea"
                      value={option.id}
                      checked={formData.focusArea === option.id}
                      onChange={(e) => updateFormData('focusArea', e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-10 h-10 bg-gradient-to-br ${option.color} rounded-lg flex items-center justify-center mr-4`}>
                      <option.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-gray-800">{option.label}</span>
                  </label>
                ))}
              </div>
              {errors.focusArea && <p className="text-red-500 text-sm mt-1">{errors.focusArea}</p>}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-mystical-50 py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-gray-500">{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-mystical-500 to-primary-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-mystical-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {currentStep === 1 && "Let's start with your basics"}
              {currentStep === 2 && "When were you born?"}
              {currentStep === 3 && "Where were you born?"}
              {currentStep === 4 && "What's your focus?"}
            </h2>
            <p className="text-gray-600">
              {currentStep === 1 && "We need your name and gender for personalized predictions"}
              {currentStep === 2 && "Exact birth time is crucial for accurate astrology"}
              {currentStep === 3 && "Location helps us calculate planetary positions"}
              {currentStep === 4 && "Choose what you'd like to explore in your reading"}
            </p>
          </div>

          {/* Form Content */}
          <div className="mb-8">
            {renderStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                currentStep === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>

            {currentStep < totalSteps ? (
              <button
                onClick={nextStep}
                className="flex items-center gap-2 bg-gradient-to-r from-mystical-500 to-primary-600 hover:from-mystical-600 hover:to-primary-700 text-white px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-gradient-to-r from-gold-500 to-mystical-500 hover:from-gold-600 hover:to-mystical-600 text-white px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Star className="w-4 h-4" />
                    Get My Reading
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>🔒 Your information is secure and encrypted</p>
        </div>
      </div>
    </div>
  );
};

export default WizardForm;