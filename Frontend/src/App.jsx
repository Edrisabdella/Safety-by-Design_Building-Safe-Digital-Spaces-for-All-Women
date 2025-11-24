import React from 'react'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          🛡️ SafeSpace
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Digital Safety Platform for Women & Girls
        </p>
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Welcome to SafeSpace
          </h2>
          <p className="text-gray-600 mb-6">
            Your safety platform is being prepared. This is a temporary landing page.
          </p>
          <button 
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors w-full"
            onClick={() => alert('Emergency feature will be implemented soon!')}
          >
            🚨 Emergency Button
          </button>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Developer Info</h3>
            <p className="text-sm text-gray-600">
              <strong>Edris Abdella Nuure</strong><br/>
              Dire Dawa, Ethiopia<br/>
              edrisabdella178@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App