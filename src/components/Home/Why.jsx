const data = [
  {
    title: '100K',
    description: 'Active Users'
  },
  {
    title: '50K',
    description: 'Links Created Monthly'
  },
  {
    title: '500+',
    description: 'Integrations'
  },
  {
    title: '99%',
    description: 'Uptime Server'
  }
]

const Why = () => {
  return (
    <section className="md:px-10 w-full max-w-6xl px-2 py-10 mx-auto">
        <header className="md:flex-row flex flex-col items-center justify-between mb-4">
            <h4 className="text-4xl font-bold text-center">WHY USE OUR SERVICE</h4>
            <p className="md:w-1/3 md:text-start w-full text-center">Our platform was build to help you make every point of connection between your content and your audience ignite action.</p>
        </header>
        <article className="md:flex-row flex flex-col w-full gap-4">
          <div className="md:w-2/3 sm:grid-cols-2 grid w-full gap-4">
            {data.map((item, index) => (
              <div key={index} className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg">
                <h5 className="text-2xl font-bold">{item.title}</h5>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="md:w-1/3 bg-gradient-to-tl from-blue-600 from-55% to-blue-400 flex items-end justify-start w-full p-4 border border-gray-200 rounded-lg">
            <h5 className="text-2xl font-bold text-white">SSL and redirection url with no worries</h5>
          </div>
        </article>
    </section>
  )
}

export default Why