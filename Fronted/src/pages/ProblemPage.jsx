


import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Editor from '@monaco-editor/react';
import { useParams } from 'react-router';
import axiosClient from "../utils/axiosClient"
import SubmissionHistory from "../components/SubmissionHistory"
import ChatAi from '../components/ChatAi';
import Editorial from '../components/Editorial';


const langMap = {
  cpp: 'C++',
  java: 'Java',
  javascript: 'JavaScript'
};


const ProblemPage = () => {
  const [problem, setProblem] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [activeLeftTab, setActiveLeftTab] = useState('description');
  const [activeRightTab, setActiveRightTab] = useState('code');
  const [activeTestIndex, setActiveTestIndex] = useState(0);
  const [showTestCases, setShowTestCases] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const editorRef = useRef(null);
  let { problemId } = useParams();


  const { handleSubmit } = useForm();


  useEffect(() => {
    const fetchProblem = async () => {
      setLoading(true);
      try {
        const response = await axiosClient.get(`/problem/problemById/${problemId}`);
        const initialCode = response.data.startCode.find(sc => sc.language === langMap[selectedLanguage]).initialCode;
        setProblem(response.data);
        setCode(initialCode);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchProblem();
  }, [problemId]);


  useEffect(() => {
    if (problem) {
      const initialCode = problem.startCode.find(sc => sc.language === langMap[selectedLanguage]).initialCode;
      setCode(initialCode);
    }
  }, [selectedLanguage, problem]);


  const handleEditorChange = (value) => setCode(value || '');
  const handleEditorDidMount = (editor) => { editorRef.current = editor; };
  const handleLanguageChange = (language) => setSelectedLanguage(language);


  const handleRun = async () => {
    setIsRunning(true);
    setLoading(true);
    setRunResult(null);
    setShowTestCases(true);
    setActiveTestIndex(0);
    
    try {
      const response = await axiosClient.post(`/submission/run/${problemId}`, {
        code,
        language: selectedLanguage
      });
      setRunResult(response.data);
      setLoading(false);
      setIsRunning(false);
    } catch (error) {
      setRunResult({
        success: false,
        error: 'Internal server error',
        testCases: []
      });
      setLoading(false);
      setIsRunning(false);
    }
  };


  const handleSubmitCode = async () => {
    setIsSubmitting(true);
    setLoading(true);
    setSubmitResult(null);
    setActiveRightTab('result');
    
    try {
      const response = await axiosClient.post(`/submission/submit/${problemId}`, {
        code: code,
        language: selectedLanguage
      });
      setSubmitResult(response.data);
      setLoading(false);
      setIsSubmitting(false);
    } catch (error) {
      setSubmitResult(null);
      setLoading(false);
      setIsSubmitting(false);
    }
  };


  const getLanguageForMonaco = (lang) => {
    switch (lang) {
      case 'javascript': return 'javascript';
      case 'java': return 'java';
      case 'cpp': return 'cpp';
      default: return 'javascript';
    }
  };


  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100 border-green-300';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-300';
      case 'hard': return 'text-red-600 bg-red-100 border-red-300';
      default: return 'text-gray-600 bg-gray-100 border-gray-300';
    }
  };


  if (loading && !problem) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Loading problem...</p>
        </div>
      </div>
    );
  }


  return (
    <div className="h-screen flex bg-gray-50">
      {/* Left Panel - 50% */}
      <div className="w-1/2 flex flex-col border-r border-gray-300 bg-white">
        {/* Left Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          {[
            { id: 'description', label: 'Description' },
            { id: 'editorial', label: 'Editorial' },
            { id: 'solutions', label: 'Solutions' },
            { id: 'submissions', label: 'Submissions' },
            { id: 'chatAI', label: 'ChatAI' }
          ].map(tab => (
            <button
              key={tab.id}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
                activeLeftTab === tab.id
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
              }`}
              onClick={() => setActiveLeftTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>


        {/* Left Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {problem && (
            <>
              {activeLeftTab === 'description' && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">{problem.title}</h1>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {problem.tags}
                    </span>
                  </div>
                  
                  <div className="prose prose-gray max-w-none mb-8">
                    <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {problem.description}
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Examples:</h3>
                    {problem.visibleTestCases.map((example, index) => (
                      <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                        <h4 className="font-semibold text-gray-900 mb-3">Example {index + 1}:</h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex">
                            <span className="font-semibold text-gray-700 w-20">Input:</span>
                            <span className="font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">
                              {example.uiInput}
                            </span>
                          </div>
                          <div className="flex">
                            <span className="font-semibold text-gray-700 w-20">Output:</span>
                            <span className="font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">
                              {example.uiOutput}
                            </span>
                          </div>
                          {example.explanation && (
                            <div className="flex">
                              <span className="font-semibold text-gray-700 w-20">Explanation:</span>
                              <span className="text-gray-800">{example.explanation}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}


              {activeLeftTab === 'editorial' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Editorial</h2>
                  <div className="prose prose-gray max-w-none">
                    <Editorial secureUrl={problem.secureUrl} thumbnailUrl={problem.thumbnailUrl} duration={problem.duration}/>
                  </div>
                </div>
              )}


              {activeLeftTab === 'solutions' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Solutions</h2>
                  <div className="space-y-4">
                    {problem.referenceSolution?.length > 0 ? (
                      problem.referenceSolution.map((solution, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                          <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                            <h3 className="font-semibold text-gray-900">
                              {problem.title} - {solution.language}
                            </h3>
                          </div>
                          <div className="p-4">
                            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                              <code>{solution.completeCode}</code>
                            </pre>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 italic">Solutions will be available after you solve the problem.</p>
                    )}
                  </div>
                </div>
              )}


              {activeLeftTab === 'submissions' && (
                <div className='bg-black'>
                  <h2 className="text-xl font-bold text-white pl-68 mb-4">My Submissions</h2>
            
                  <SubmissionHistory problemId={problemId} />
                </div>
              )}


              {activeLeftTab === 'chatAI' && (
                <div>
                  <h2 className="text-xl font-bold flex ml-70 text-gray-900 mb-4">Chat with AI</h2>
                  <ChatAi problem={problem} />
       {/* <ChatAi problem={problem} textSpeed={1} codeInstant={true} /> */}

                </div>
              )}
            </>
          )}
        </div>
      </div>


      {/* Right Panel - 50% */}
     <div className="w-1/2 flex flex-col bg-white">
  {/* Code Editor Section */}
  <div className="flex flex-col h-full">
    {/* Language Selector */}
    <div className="flex items-center justify-between px-4 py-3 bg-gray-100 border-b border-gray-200">
      <div className="flex items-center space-x-2">
        <select
          value={selectedLanguage}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="javascript">JavaScript</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>
        <span className="text-sm text-gray-500">|</span>
        <span className="text-sm text-gray-600">Auto-save enabled</span>
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      </div>
    </div>


    {/* Monaco Editor */}
    <div className="flex-1 relative">
      <Editor
        height="85%"
        language={getLanguageForMonaco(selectedLanguage)}
        value={code}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        theme="vs-dark"
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          insertSpaces: true,
          wordWrap: 'on',
          lineNumbers: 'on',
          glyphMargin: false,
          folding: true,
          lineDecorationsWidth: 10,
          lineNumbersMinChars: 3,
          renderLineHighlight: 'line',
          selectOnLineNumbers: true,
          roundedSelection: false,
          readOnly: false,
          cursorStyle: 'line',
          mouseWheelZoom: true,
        }}
      />
    </div>


    {/* Action Buttons */}
    <div className=" fixed bottom-8 right-0 px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
      <button
        onClick={handleRun}
        disabled={loading}
        className={`px-6 py-2 rounded-lg font-medium text-sm transition-all duration-200 transform ${
          isRunning
            ? 'bg-blue-400 text-white cursor-not-allowed scale-95'
            : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 active:scale-95'
        } ${loading ? 'animate-pulse' : ''}`}
      >
        {isRunning ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Running...</span>
          </div>
        ) : (
          'Run Code'
        )}
      </button>
      
      <button
        onClick={handleSubmitCode}
        disabled={loading}
        className={`px-6 py-2 rounded-lg font-medium text-sm transition-all duration-200 transform ${
          isSubmitting
            ? 'bg-green-400 text-white cursor-not-allowed scale-95'
            : 'bg-green-600 text-white hover:bg-green-700 hover:scale-105 active:scale-95'
        } ${loading ? 'animate-pulse' : ''}`}
      >
        {isSubmitting ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Submitting...</span>
          </div>
        ) : (
          'Submit'
        )}
      </button>
    </div>
  </div>


  {/* Sliding Test Cases Panel */}


<div 
  className={`fixed bottom-10 right-0 bg-white border-t-2 border-gray-300 transition-transform duration-300 ease-in-out z-20 shadow-lg ${
    showTestCases ? 'transform translate-y-0' : 'transform translate-y-full'
  }`}
  style={{ 
    width: '50%', 
    height: '50vh',
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px'
  }}
>
  {/* Test Case Header with Drag Handle */}
  <div className="flex items-center justify-between px-4 py-3 bg-orange-50 border-b border-orange-200 cursor-pointer">
    <div className="flex items-center space-x-2">
      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
      <span className="font-semibold text-orange-800">Test Cases</span>
{/*       <span className="text-sm text-orange-600">
        Results ({runResult?.testCases?.length || 0}/2)
      </span> */}
    </div>
    <div className="flex items-center space-x-2">
      {/* Drag Handle */}
      <div className="flex flex-col space-y-1">
        <div className="w-6 h-0.5 bg-gray-400 rounded"></div>
        <div className="w-6 h-0.5 bg-gray-400 rounded"></div>
        <div className="w-6 h-0.5 bg-gray-400 rounded"></div>
      </div>
      <button
        onClick={() => setShowTestCases(false)}
        className="text-orange-600 hover:text-orange-800 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
  <button
        onClick={() => setShowTestCases(true)}
        className="text-orange-600 hover:text-orange-800 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
    </div>
  </div>


  {/* Test Case Buttons */}
  <div className="px-4 py-3 border-b border-gray-200">
    <div className="flex space-x-3 overflow-x-auto">
      {(runResult?.testCases || []).map((tc, idx) => (
        <button
          key={idx}
          onClick={() => setActiveTestIndex(idx)}
          className={`px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 transition-all duration-200 whitespace-nowrap ${
            activeTestIndex === idx
              ? 'bg-orange-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <span>Case {idx + 1}</span>
          {tc.status_id === 3 ? (
            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
              </svg>
            </div>
          ) : (
            <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </div>
          )}
        </button>
      ))}
    </div>
  </div>


  {/* Test Case Details - Scrollable */}
  <div className="flex-1 overflow-y-auto p-4">
    {runResult?.testCases?.length > 0 && (
      <div className="space-y-4">
        {/* Input and Expected Output - Side by Side */}
        <div className="grid grid-cols-2 gap-4">
          {/* Input Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="font-semibold text-blue-700 text-sm">Input:</span>
            </div>
            <div className="bg-white border border-blue-200 rounded-lg p-3 min-h-[60px]">
              <code className="text-sm text-gray-800 font-mono">
                {runResult.testCases[activeTestIndex]?.stdin}
              </code>
            </div>
          </div>


          {/* Expected Output Section */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-semibold text-green-700 text-sm">Expected Output:</span>
            </div>
            <div className="bg-white border border-green-200 rounded-lg p-3 min-h-[60px]">
              <code className="text-sm text-gray-800 font-mono">
                {runResult.testCases[activeTestIndex]?.expected_output}
              </code>
            </div>
          </div>
        </div>


        {/* Your Output Section - Full Width */}
        {runResult.testCases[activeTestIndex]?.stdout && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-3">
              <div className={`w-3 h-3 rounded-full ${
                runResult.testCases[activeTestIndex]?.status_id === 3 
                  ? 'bg-green-500' 
                  : 'bg-red-500'
              }`}></div>
              <span className="font-semibold text-gray-700 text-sm">Your Output:</span>
            </div>
            <div className={`bg-white rounded-lg p-3 min-h-[60px] border ${
              runResult.testCases[activeTestIndex]?.status_id === 3
                ? 'border-green-200'
                : 'border-red-200'
            }`}>
              <code className={`text-sm font-mono ${
                runResult.testCases[activeTestIndex]?.status_id === 3
                  ? 'text-green-800'
                  : 'text-red-800'
              }`}>
                {runResult.testCases[activeTestIndex]?.stdout || 'No output'}
              </code>
            </div>
          </div>
        )}


        {/* Custom Test Case - This section will overflow and be scrollable */}
{/*         <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mt-6">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="font-semibold text-purple-700 text-sm">Custom Test Case:</span>
          </div>
          <textarea
            className="w-full p-4 border border-purple-300 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            rows="4"
            placeholder="Enter your custom test case here... Example: nums = [1, 2, 3], target = 5"
          />
          <button className="mt-4 px-6 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m6-10V7a3 3 0 11-6 0V4a3 3 0 00-6 0v3a3 3 0 11-6 0V4"></path>
            </svg>
            <span>Test Custom Input</span>
          </button>
        </div> */}
      </div>
    )}
  </div>
</div> 




  {/* Results Modal Overlay */}
  {activeRightTab === 'result' && submitResult && (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-30 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Submission Result</h3>
          <button
            onClick={() => setActiveRightTab('code')}
            className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          {submitResult.accepted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-green-800">🎉 Accepted</h4>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-green-700">Test Cases Passed:</span>
                  <span className="font-semibold text-green-900">{submitResult.passedTestCases}/{submitResult.totalTestCases}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Runtime:</span>
                  <span className="font-semibold text-green-900">{submitResult.runtime} sec</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Memory:</span>
                  <span className="font-semibold text-green-900">{submitResult.memory} KB</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-red-800">❌ {submitResult.error}</h4>
              </div>
              <div className="flex justify-between">
                <span className="text-red-700">Test Cases Passed:</span>
                <span className="font-semibold text-red-900">{submitResult.passedTestCases}/{submitResult.totalTestCases}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )}
</div>


    </div>
  );
};


export default ProblemPage;  