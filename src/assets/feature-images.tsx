import React from 'react';

// Feature illustration components using CSS and icons
export const AIAssistantIllustration = () => (
  <div className="relative w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-400/20"></div>
    <div className="relative z-10 text-center">
      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
        <span className="text-3xl">🤖</span>
      </div>
      <div className="space-y-2">
        <div className="h-2 bg-green-300 rounded w-24 mx-auto opacity-60"></div>
        <div className="h-2 bg-green-300 rounded w-16 mx-auto opacity-40"></div>
        <div className="h-2 bg-green-300 rounded w-20 mx-auto opacity-30"></div>
      </div>
    </div>
    <div className="absolute top-4 right-4 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
      <span className="text-lg">💬</span>
    </div>
  </div>
);

export const CommunityIllustration = () => (
  <div className="relative w-full h-48 bg-gradient-to-br from-green-100 to-emerald-200 rounded-lg flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-400/20"></div>
    <div className="relative z-10 flex items-center space-x-4">
      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
        <span className="text-xl">👩</span>
      </div>
      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
        <span className="text-xl">👨</span>
      </div>
      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
        <span className="text-xl">👦</span>
      </div>
    </div>
    <div className="absolute bottom-4 left-4 right-4">
      <div className="h-1 bg-white/60 rounded mb-2"></div>
      <div className="h-1 bg-white/40 rounded w-3/4"></div>
    </div>
    <div className="absolute top-4 left-4 w-6 h-6 bg-white/80 rounded-full flex items-center justify-center">
      <span className="text-sm">💛</span>
    </div>
  </div>
);

export const AppointmentIllustration = () => (
  <div className="relative w-full h-48 bg-gradient-to-br from-green-100 to-teal-200 rounded-lg flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-teal-400/20"></div>
    <div className="relative z-10 text-center">
      <div className="w-20 h-16 bg-white rounded-lg flex items-center justify-center mb-4 mx-auto shadow-lg">
        <div className="text-center">
          <div className="text-xs font-bold text-green-600">AUG</div>
          <div className="text-lg font-bold text-gray-800">15</div>
        </div>
      </div>
      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto shadow-md">
        <span className="text-xl">👩‍⚕️</span>
      </div>
    </div>
    <div className="absolute top-4 right-4 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
      <span className="text-lg">⏰</span>
    </div>
  </div>
);

export const ResourcesIllustration = () => (
  <div className="relative w-full h-48 bg-gradient-to-br from-orange-100 to-yellow-200 rounded-lg flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-yellow-400/20"></div>
    <div className="relative z-10 text-center">
      <div className="w-16 h-12 bg-white rounded-lg flex items-center justify-center mb-4 mx-auto shadow-lg">
        <span className="text-2xl">📚</span>
      </div>
      <div className="space-y-2">
        <div className="flex space-x-2 justify-center">
          <div className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
            <span className="text-sm">🧘</span>
          </div>
          <div className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
            <span className="text-sm">📊</span>
          </div>
          <div className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
            <span className="text-sm">💡</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const WelcomeIllustration = () => (
  <div className="relative w-full h-64 bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 via-emerald-400/10 to-teal-400/10"></div>
    <div className="relative z-10 text-center">
      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 mx-auto shadow-xl">
        <span className="text-4xl">🏥</span>
      </div>
      <div className="flex space-x-4 justify-center">
        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-xl">❤️</span>
        </div>
        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-xl">🩺</span>
        </div>
        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-xl">🧠</span>
        </div>
      </div>
    </div>
    <div className="absolute top-4 left-4 w-8 h-8 bg-white/60 rounded-full flex items-center justify-center">
      <span className="text-lg">✨</span>
    </div>
    <div className="absolute bottom-4 right-4 w-8 h-8 bg-white/60 rounded-full flex items-center justify-center">
      <span className="text-lg">🌟</span>
    </div>
    <div className="absolute top-8 right-8 w-6 h-6 bg-white/40 rounded-full flex items-center justify-center">
      <span className="text-sm">💫</span>
    </div>
  </div>
);
