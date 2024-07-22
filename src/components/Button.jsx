import ButtonLoading from "./ButtonLoading.jsx"

const buttonColors = {
  'red': 'bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 text-white',
  'yellow': 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800 text-white',
  'purple': 'bg-purple-700 hover:bg-purple-800 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 text-white',
  'green': 'bg-green-700 hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 text-white',
  'blue': 'bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-white',
  'gray': 'bg-gray-700 hover:bg-gray-800 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 text-white',
  'gray-2': 'bg-gray-800 hover:bg-gray-900 focus:ring-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 text-white',
  'indigo': 'bg-indigo-700 hover:bg-indigo-800 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 text-white',
  'pink': 'bg-pink-700 hover:bg-pink-800 focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800 text-white',
  'white': 'bg-white hover:bg-gray-200 focus:ring-blue-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800 text-blue-700 dark:text-blue-300 border border-blue-700 dark:border-blue-300',
}

const Button = ({ text, type, loading, color = 'purple', onClick }) => {

  if (loading) {
    return <ButtonLoading color={color} />
  }

  return (
    <button type={type} onClick={onClick} className={`text-nowrap focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ${buttonColors[color]}`}>{text}</button>
  )
}

export default Button