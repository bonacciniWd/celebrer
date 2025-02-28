export default function Accordion() {
  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-12">
      <div className="max-w-7xl mt-20 md:mt-28 h-auto mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Accordion */}
        <div className="space-y-4 col-span-1 md:col-span-1">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <input type="checkbox" id="accordion1" className="peer hidden" />
            <label
              htmlFor="accordion1"
              className="flex items-center justify-between p-4 bg-slate-800 transition-colors"
            >
              <span className="text-lg font-semibold">Professional Profile</span>
              <svg
                className="w-6 h-6 transition-transform peer-checked:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </label>
            <div className="max-h-0 overflow-hidden transition-all duration-300 peer-checked:max-h-screen">
              <div className="p-4">
                <p className="text-gray-700 leading-relaxed">
                  Full-stack developer with expertise in modern web technologies and a passion for creating innovative solutions.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <input type="checkbox" id="accordion2" className="peer hidden" />
            <label
              htmlFor="accordion2"
              className="flex items-center justify-between p-4 bg-slate-800 transition-colors"
            >
              <span className="text-lg font-semibold">MyKare Experience</span>
              <svg
                className="w-6 h-6 transition-transform peer-checked:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </label>
            <div className="max-h-0 overflow-hidden transition-all duration-300 peer-checked:max-h-screen">
              <div className="p-4">
                <p className="text-gray-700 leading-relaxed">
                  Contributing to healthcare innovation through advanced web development and system architecture.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <input type="checkbox" id="accordion3" className="peer hidden" />
            <label
              htmlFor="accordion3"
              className="flex items-center justify-between p-4 bg-slate-800 transition-colors"
            >
              <span className="text-lg font-semibold">Project Showcase</span>
              <svg
                className="w-6 h-6 transition-transform peer-checked:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </label>
            <div className="max-h-0 overflow-hidden transition-all duration-300 peer-checked:max-h-screen">
              <div className="p-4">
                <p className="text-gray-700 leading-relaxed">
                  Building cutting-edge applications using Next.js, React, and modern web technologies.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <input type="checkbox" id="accordion4" className="peer hidden" />
            <label
              htmlFor="accordion4"
              className="flex items-center justify-between p-4 bg-slate-800 transition-colors"
            >
              <span className="text-lg font-semibold">Technical Skills</span>
              <svg
                className="w-6 h-6 transition-transform peer-checked:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </label>
            <div className="max-h-0 overflow-hidden transition-all duration-300 peer-checked:max-h-screen">
              <div className="p-4">
                <p className="text-gray-700 leading-relaxed">
                  Expertise in full-stack development, cloud technologies, and modern frameworks.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <input type="checkbox" id="accordion5" className="peer hidden" />
            <label
              htmlFor="accordion5"
              className="flex items-center justify-between p-4 bg-slate-800 transition-colors"
            >
              <span className="text-lg font-semibold">Development Process</span>
              <svg
                className="w-6 h-6 transition-transform peer-checked:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </label>
            <div className="max-h-0 overflow-hidden transition-all duration-300 peer-checked:max-h-screen">
              <div className="p-4">
                <p className="text-gray-700 leading-relaxed">
                  Following industry best practices and agile methodologies for efficient development.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <input type="checkbox" id="accordion6" className="peer hidden" />
            <label
              htmlFor="accordion6"
              className="flex items-center justify-between p-4 bg-slate-800 transition-colors"
            >
              <span className="text-lg font-semibold">Creative Vision</span>
              <svg
                className="w-6 h-6 transition-transform peer-checked:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </label>
            <div className="max-h-0 overflow-hidden transition-all duration-300 peer-checked:max-h-screen">
              <div className="p-4">
                <p className="text-gray-700 leading-relaxed">
                  Combining technical expertise with creative design to deliver outstanding user experiences.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Imagem (para Desktop) */}
        <div className="hidden md:block col-span-1 relative">
          {/* Imagem de fundo */}
          <img
            src="/vercel.svg"
            alt="Imagem de fundo"
            className="w-[90%] animate-spin ml-20 h-auto object-cover rounded-lg sticky top-0 z-0"
          />

          {/* Segunda imagem sobreposta */}
          <img
            src="/next.svg"
            alt="Imagem sobreposta"
            className="w-[80%] ml-16 h-auto object-cover rounded-lg absolute top-10 left-10 z-10"
          />
        </div>

      </div>

    </div>
  );
}
