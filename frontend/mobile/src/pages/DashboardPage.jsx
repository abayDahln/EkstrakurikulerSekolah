import { Users, Calendar, Trophy, Bell } from "lucide-react"
import Card from "../components/Card"
import Button from "../components/Button"
import { useAuth } from '../contexts/AuthContext';
import dummyData from "../data/dummy.json"

export default function DashboardPage({ onNavigate }) {
  const { user } = useAuth()

  const myEkskul = dummyData.ekstrakurikuler.filter(e =>
    user?.joinedEkskul.includes(e.id)
  )

  const upcomingSchedules = dummyData.schedules
    .filter(s => user?.joinedEkskul.includes(s.ekskulId))
    .slice(0, 3)

  const stats = [
    {
      icon: Users,
      label: "Ekskul Diikuti",
      value: myEkskul.length,
      color: "from-blue-400 to-blue-600"
    },
    {
      icon: Calendar,
      label: "Jadwal Minggu Ini",
      value: upcomingSchedules.length,
      color: "from-green-400 to-green-600"
    },
    {
      icon: Trophy,
      label: "Total Prestasi",
      value: myEkskul.reduce((acc, e) => acc + e.achievements.length, 0),
      color: "from-yellow-400 to-yellow-600"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Selamat Datang, {user?.name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Kelola kegiatan ekstrakurikuler kamu di sini
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`w-14 h-14 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {dummyData.announcements.length > 0 && (
          <Card className="p-6 mb-8 bg-sky-50 dark:bg-sky-900/20 border-2 border-sky-200 dark:border-sky-800">
            <div className="flex items-start space-x-4">
              <div className="bg-sky-500 p-2 rounded-lg">
                <Bell className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Pengumuman Terbaru
                </h3>
                <div className="space-y-3">
                  {dummyData.announcements.slice(0, 2).map(announcement => (
                    <div
                      key={announcement.id}
                      className="pb-3 border-b border-sky-200 dark:border-sky-800 last:border-0 last:pb-0"
                    >
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                        {announcement.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {announcement.content}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {new Date(announcement.date).toLocaleDateString(
                          "id-ID",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                          }
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Ekstrakurikuler Saya
              </h2>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onNavigate("ekskul")}
              >
                Lihat Semua
              </Button>
            </div>

            {myEkskul.length === 0 ? (
              <Card className="p-8 text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Kamu belum bergabung dengan ekstrakurikuler apapun
                </p>
                <Button onClick={() => onNavigate("ekskul")}>
                  Jelajahi Ekstrakurikuler
                </Button>
              </Card>
            ) : (
              <div className="space-y-4">
                {myEkskul.map(ekskul => (
                  <Card
                    key={ekskul.id}
                    hover
                    onClick={() => onNavigate("ekskul-detail", ekskul.id)}
                    className="p-4"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={ekskul.image}
                        alt={ekskul.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {ekskul.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {ekskul.category}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          {ekskul.jadwal}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Jadwal Mendatang
              </h2>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onNavigate("schedule")}
              >
                Lihat Semua
              </Button>
            </div>

            {upcomingSchedules.length === 0 ? (
              <Card className="p-8 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  Tidak ada jadwal mendatang
                </p>
              </Card>
            ) : (
              <div className="space-y-4">
                {upcomingSchedules.map(schedule => (
                  <Card
                    key={schedule.id}
                    hover
                    onClick={() => onNavigate("schedule-detail", schedule.id)}
                    className="p-4"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="bg-sky-100 dark:bg-sky-900 p-3 rounded-lg">
                        <Calendar className="h-6 w-6 text-sky-600 dark:text-sky-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {schedule.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {schedule.ekskulName}
                        </p>
                        <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-500">
                          <span>
                            {schedule.day}, {schedule.date}
                          </span>
                          <span>•</span>
                          <span>
                            {schedule.startTime} - {schedule.endTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
