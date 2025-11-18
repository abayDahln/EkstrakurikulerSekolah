import { Users, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-sky-400 to-blue-500 p-2 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold text-white">EkskulHub</span>
            </div>
            <p className="text-sm">
              Platform manajemen ekstrakurikuler sekolah yang memudahkan siswa untuk bergabung dan mengelola kegiatan ekstrakurikuler.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Hubungi Kami</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-sky-400" />
                <span className="text-sm">info@ekskulhub.sch.id</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-sky-400" />
                <span className="text-sm">+62 21 1234 5678</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-sky-400" />
                <span className="text-sm">Jakarta, Indonesia</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Jam Operasional</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Senin - Jumat</span>
                <span className="text-sky-400">07:00 - 17:00</span>
              </div>
              <div className="flex justify-between">
                <span>Sabtu</span>
                <span className="text-sky-400">08:00 - 13:00</span>
              </div>
              <div className="flex justify-between">
                <span>Minggu</span>
                <span className="text-red-400">Tutup</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2024 EkskulHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
