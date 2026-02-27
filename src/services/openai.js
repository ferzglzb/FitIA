const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const generatePlan = async (userData) => {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key is missing. Please check your .env.local file.');
  }

  const systemPrompt = `You are a world-class certified personal trainer and nutritionist. 
Your job is to generate a highly personalized, detailed, and realistic workout and nutrition plan.
Return ONLY a valid JSON object matching the requested schema. Do not include markdown formatting or extra text.

The user data is as follows:
Age: ${userData.age}
Gender: ${userData.gender}
Weight: ${userData.weight} kg
Height: ${userData.height} cm
Primary Goal: ${userData.goal}
Activity Level: ${userData.activityLevel}
Workout Days/Week: ${userData.daysPerWeek}
Dietary Restrictions: ${userData.dietaryRestrictions || 'None'}

You MUST use EXACTLY the following JSON schema format:
{
  "workoutPlan": {
    "summary": "A brief, encouraging overview of the workout strategy.",
    "days": [
      {
        "dayName": "e.g., Day 1: Push (Chest, Shoulders, Triceps) or Rest Day",
        "isRest": false,
        "exercises": [
          {
            "name": "Barbell Bench Press",
            "sets": "4",
            "reps": "8-12",
            "notes": "Focus on slow eccentric."
          }
        ]
      }
    ]
  },
  "nutritionPlan": {
    "summary": "A brief, encouraging overview of the nutrition strategy.",
    "dailyCalories": 2500,
    "macros": {
      "protein": "160g",
      "carbs": "250g",
      "fats": "70g"
    },
    "meals": [
      {
        "type": "Breakfast",
        "suggestion": "Oatmeal with protein powder and berries.",
        "calories": 450
      }
    ]
  }
}`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: 'Generate my personalized plan based on my profile.' }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to generate plan');
    }

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    console.error('Error in generatePlan:', error);
    throw error;
  }
};

export const generateMealIdeas = async (macros) => {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key is missing.');
  }

  const prompt = `You are an expert sports nutritionist. Generate 4 meal ideas for a person with these daily macros:
- Calories: ${macros.cal} kcal
- Protein: ${macros.protein}g
- Carbs: ${macros.carbs}g
- Fats: ${macros.fats}g

Return ONLY valid JSON with this format:
[
  { "name": "Meal Name (e.g. Breakfast)", "description": "Brief description of the meal with ingredients", "calories": 500, "protein": "40g", "carbs": "50g", "fats": "15g" }
]`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: 'Generate my meals.' }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || 'Failed to generate meals');
  }

  const data = await response.json();
  const parsed = JSON.parse(data.choices[0].message.content);
  return Array.isArray(parsed) ? parsed : parsed.meals || parsed.meal_ideas || Object.values(parsed)[0];
};
