import { useState } from "react"
import { Search, Filter, Users } from "lucide-react"
import Card from "../components/Card"
import dummyData from "../data/dummy.json"

export default function EkskulPage({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Semua")

  const categories = [
    "Semua",
    "Olahraga",
    "Seni",
    "Teknologi",
    "Media",
    "Kepemimpinan"
  ]

  const filteredEkskul = dummyData.ekstrakurikuler.filter(ekskul => {
    const matchesSearch =
      ekskul.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ekskul.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "Semua" || ekskul.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Ekstrakurikuler
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Jelajahi dan bergabung dengan ekstrakurikuler pilihanmu
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari ekstrakurikuler..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors"
            />
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? "bg-sky-500 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredEkskul.length === 0 ? (
          <Card className="p-12 text-center">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Tidak ada hasil
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Coba ubah kata kunci pencarian atau filter kategori
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEkskul.map(ekskul => (
              <Card
                key={ekskul.id}
                hover
                onClick={() => onNavigate("ekskul-detail", ekskul.id)}
                className="overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={ekskul.image}
                    alt={ekskul.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 px-3 py-1 rounded-full">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {ekskul.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {ekskul.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {ekskul.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span>{ekskul.pembina}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Peserta:</span>
                      <span className="ml-2">
                        {ekskul.currentPeserta}/{ekskul.maxPeserta}
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-sky-400 to-blue-600 h-2 rounded-full transition-all"
                      style={{
                        width: `${(ekskul.currentPeserta / ekskul.maxPeserta) *
                          100}%`
                      }}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
