import { ArrowRight, Users, Calendar, Award, Star } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

export default function LandingPage({ onNavigate }) {
  const features = [
    {
      icon: Users,
      title: 'Beragam Pilihan',
      description: 'Lebih dari 20+ ekstrakurikuler dengan berbagai kategori mulai dari olahraga, seni, hingga teknologi',
    },
    {
      icon: Calendar,
      title: 'Jadwal Terorganisir',
      description: 'Sistem penjadwalan yang rapi memudahkan kamu mengatur waktu dan tidak melewatkan kegiatan',
    },
    {
      icon: Award,
      title: 'Prestasi Gemilang',
      description: 'Raih prestasi di berbagai kompetisi tingkat regional hingga nasional bersama tim terbaik',
    },
    {
      icon: Star,
      title: 'Pembina Profesional',
      description: 'Dibimbing oleh pembina berpengalaman dan bersertifikat di bidangnya masing-masing',
    },
  ];

  const categories = [
    { name: 'Olahraga', count: 3, color: 'from-blue-400 to-blue-600' },
    { name: 'Seni', count: 3, color: 'from-purple-400 to-purple-600' },
    { name: 'Teknologi', count: 1, color: 'from-green-400 to-green-600' },
    { name: 'Kepemimpinan', count: 1, color: 'from-orange-400 to-orange-600' },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-gray-800">
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Temukan Passion-mu di
              <span className="block bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">
                Ekstrakurikuler Sekolah
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Platform lengkap untuk mengeksplorasi, mendaftar, dan mengelola kegiatan ekstrakurikuler.
              Kembangkan bakat dan minatmu bersama kami!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => onNavigate('login')}>
                Mulai Sekarang
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => onNavigate('about')}>
                Pelajari Lebih Lanjut
              </Button>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card key={index} hover>
                <div className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{category.count} Ekskul</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Mengapa Memilih Kami?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Kami menyediakan pengalaman terbaik untuk pengembangan diri siswa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-sky-400 to-blue-600 p-3 rounded-lg">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-sky-500 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Siap Bergabung dengan Kami?
          </h2>
          <p className="text-lg text-sky-100 mb-8">
            Daftar sekarang dan mulai perjalanan mengembangkan bakatmu!
          </p>
          <Button size="lg" variant="secondary" onClick={() => onNavigate('login')}>
            Daftar Sekarang
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
