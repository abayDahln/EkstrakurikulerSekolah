import { Users, Target, Eye, Award, Mail, Phone, MapPin } from "lucide-react"
import Card from "../components/Card"

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Misi Kami",
      description:
        "Memberikan wadah terbaik bagi siswa untuk mengembangkan minat, bakat, dan potensi diri melalui kegiatan ekstrakurikuler yang terstruktur dan berkualitas."
    },
    {
      icon: Eye,
      title: "Visi Kami",
      description:
        "Menjadi platform ekstrakurikuler sekolah terdepan yang menghasilkan siswa-siswi berprestasi dan berkarakter unggul."
    },
    {
      icon: Award,
      title: "Komitmen Kami",
      description:
        "Memberikan pengalaman terbaik dengan pembina profesional, fasilitas memadai, dan sistem manajemen yang modern."
    }
  ]

  const stats = [
    { value: "8+", label: "Ekstrakurikuler" },
    { value: "150+", label: "Siswa Aktif" },
    { value: "12+", label: "Pembina Berpengalaman" },
    { value: "25+", label: "Prestasi Diraih" }
  ]

  const team = [
    {
      name: "Dr. Siti Nurhaliza, M.Pd",
      role: "Koordinator Ekstrakurikuler",
      image:
        "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Ahmad Fauzi, S.Pd",
      role: "Wakil Koordinator",
      image:
        "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Rina Kartika, S.Psi",
      role: "Pembimbing Siswa",
      image:
        "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full mb-4">
            <Users className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Tentang EkskulHub
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Platform manajemen ekstrakurikuler yang membantu siswa mengembangkan
            potensi diri melalui berbagai kegiatan positif dan terstruktur
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center">
              <div className="text-3xl font-bold text-sky-600 dark:text-sky-400 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <Card key={index} className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-sky-400 to-blue-600 rounded-full mb-4">
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </Card>
            )
          })}
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Tim Pengelola
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="overflow-hidden text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-sky-600 dark:text-sky-400 font-medium">
                    {member.role}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Card className="p-8 bg-gradient-to-r from-sky-500 to-blue-600">
          <div className="text-center text-white mb-8">
            <h2 className="text-3xl font-bold mb-4">Hubungi Kami</h2>
            <p className="text-sky-100">
              Ada pertanyaan? Jangan ragu untuk menghubungi kami
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <Mail className="h-8 w-8 text-white mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Email</h3>
              <p className="text-sky-100 text-sm">info@ekskulhub.sch.id</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <Phone className="h-8 w-8 text-white mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Telepon</h3>
              <p className="text-sky-100 text-sm">+62 21 1234 5678</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <MapPin className="h-8 w-8 text-white mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Alamat</h3>
              <p className="text-sky-100 text-sm">Jakarta, Indonesia</p>
            </div>
          </div>
        </Card>

        <div className="mt-12 text-center">
          <Card className="p-8 bg-sky-50 dark:bg-sky-900/20 border-2 border-sky-200 dark:border-sky-800">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Bergabunglah dengan Kami
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Temukan passion-mu dan kembangkan potensi terbaikmu bersama
              ekstrakurikuler pilihan
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Pendaftaran dibuka setiap awal semester
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
