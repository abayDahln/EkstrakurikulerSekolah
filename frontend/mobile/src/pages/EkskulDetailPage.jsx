import {
  ArrowLeft,
  Users,
  MapPin,
  Calendar,
  Award,
  CheckCircle,
  User
} from "lucide-react"
import Button from "../components/Button"
import Card from "../components/Card"
import { useAuth } from '../contexts/AuthContext';
import dummyData from "../data/dummy.json"

export default function EkskulDetailPage({ ekskulId, onNavigate }) {
  const { user } = useAuth()
  const ekskul = dummyData.ekstrakurikuler.find(e => e.id === ekskulId)

  if (!ekskul) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="p-12 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Ekstrakurikuler tidak ditemukan
            </p>
            <Button onClick={() => onNavigate("ekskul")} className="mt-4">
              Kembali
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  const isJoined = user?.joinedEkskul.includes(ekskul.id)
  const isFull = ekskul.currentPeserta >= ekskul.maxPeserta

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => onNavigate("ekskul")}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Kembali
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="overflow-hidden">
              <img
                src={ekskul.image}
                alt={ekskul.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-400 rounded-full text-sm font-medium">
                    {ekskul.category}
                  </span>
                  {isJoined && (
                    <span className="flex items-center text-green-600 dark:text-green-400 text-sm font-medium">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Sudah Bergabung
                    </span>
                  )}
                </div>

                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {ekskul.name}
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <User className="h-5 w-5 mr-3 text-sky-500" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        Pembina
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {ekskul.pembina}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Calendar className="h-5 w-5 mr-3 text-sky-500" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        Jadwal
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {ekskul.jadwal}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <MapPin className="h-5 w-5 mr-3 text-sky-500" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        Lokasi
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {ekskul.lokasi}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Users className="h-5 w-5 mr-3 text-sky-500" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        Peserta
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {ekskul.currentPeserta}/{ekskul.maxPeserta}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    Tentang
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {ekskul.fullDescription}
                  </p>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    Manfaat
                  </h2>
                  <ul className="space-y-2">
                    {ekskul.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    Perlengkapan yang Dibutuhkan
                  </h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {ekskul.requirements.map((req, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-sky-500 rounded-full mr-3" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {req}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {ekskul.achievements.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                      <Award className="h-6 w-6 text-yellow-500 mr-2" />
                      Prestasi
                    </h2>
                    <ul className="space-y-2">
                      {ekskul.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start">
                          <Award className="h-5 w-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-400">
                            {achievement}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Kapasitas
                </h3>

                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span>{ekskul.currentPeserta} peserta</span>
                    <span>{ekskul.maxPeserta} max</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-sky-400 to-blue-600 h-3 rounded-full transition-all"
                      style={{
                        width: `${(ekskul.currentPeserta / ekskul.maxPeserta) *
                          100}%`
                      }}
                    />
                  </div>
                </div>

                {isJoined ? (
                  <Button variant="secondary" fullWidth disabled>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Sudah Bergabung
                  </Button>
                ) : isFull ? (
                  <Button variant="secondary" fullWidth disabled>
                    Kuota Penuh
                  </Button>
                ) : (
                  <Button fullWidth>Daftar Sekarang</Button>
                )}

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Informasi
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-gray-500 dark:text-gray-500">
                        Waktu Latihan
                      </p>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {ekskul.jadwal}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-500">Lokasi</p>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {ekskul.lokasi}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-500">
                        Pembina
                      </p>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {ekskul.pembina}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
