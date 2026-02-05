'use client'

import Link from 'next/link'
import { useState } from 'react'

interface ExampleLayoutProps {
  title: string
  description: string
  difficulty: 'Easy' | 'Medium' | 'Advanced'
  tags: string[]
  children: React.ReactNode
  code: {
    filename: string
    language: string
    content: string
  }[]
}

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const colors = {
    Easy: 'bg-green-100 text-green-700',
    Medium: 'bg-yellow-100 text-yellow-700',
    Advanced: 'bg-red-100 text-red-700',
  }
  return (
    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${colors[difficulty as keyof typeof colors] || colors.Easy}`}>
      {difficulty}
    </span>
  )
}

export function ExampleLayout({ title, description, difficulty, tags, children, code }: ExampleLayoutProps) {
  const [activeTab, setActiveTab] = useState(0)
  const [showCode, setShowCode] = useState(false)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <span>/</span>
            <Link href="/#examples" className="hover:text-gray-700">Examples</Link>
            <span>/</span>
            <span className="text-gray-900">{title}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                <DifficultyBadge difficulty={difficulty} />
              </div>
              <p className="text-gray-600">{description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowCode(!showCode)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              {showCode ? 'Hide Code' : 'View Code'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`grid ${showCode ? 'lg:grid-cols-2' : ''} gap-8`}>
          {/* Demo Panel */}
          <div>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <span className="ml-3 text-sm text-gray-500">Live Demo</span>
                </div>
              </div>
              <div className="p-6">
                {children}
              </div>
            </div>

            {/* Test Mode Notice */}
            <div className="mt-4 flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm">
                <p className="font-medium text-amber-800">Test Mode</p>
                <p className="text-amber-700">
                  This demo uses test credentials. No real payments will be processed.
                  Use test card <code className="bg-amber-100 px-1 rounded">4084 0840 8408 4081</code> with any future date and CVV.
                </p>
              </div>
            </div>
          </div>

          {/* Code Panel */}
          {showCode && (
            <div className="bg-gray-900 rounded-xl overflow-hidden">
              <div className="border-b border-gray-700">
                <div className="flex overflow-x-auto">
                  {code.map((file, index) => (
                    <button
                      key={file.filename}
                      onClick={() => setActiveTab(index)}
                      className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                        activeTab === index
                          ? 'bg-gray-800 text-white'
                          : 'text-gray-400 hover:text-gray-200'
                      }`}
                    >
                      {file.filename}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-4 overflow-x-auto">
                <pre className="text-sm text-gray-300 font-mono">
                  <code>{code[activeTab]?.content}</code>
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
