import { useState } from 'react';
import { Calendar, MapPin, Clock, Filter } from 'lucide-react';
import Card from '../components/Card';
import { useAuth } from '../contexts/AuthContext';
import dummyData from '../data/dummy.json';

export default function SchedulePage({ onNavigate }) {
  const { user } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState('Semua');

  const filters = ['Semua', 'regular', 'workshop', 'event'];
  const filterLabels = {
    'Semua': 'Semua',
    'regular': 'Latihan Rutin',
    'workshop': 'Workshop',
    'event': 'Event Khusus',
  };

  const mySchedules = dummyData.schedules.filter(s =>
    user?.joinedEkskul.includes(s.ekskulId)
  );

  const filteredSchedules = selectedFilter === 'Semua'
    ? mySchedules
    : mySchedules.filter(s => s.type === selectedFilter);

  const groupedSchedules = filteredSchedules.reduce((acc, schedule) => {
    if (!acc[schedule.date]) {
      acc[schedule.date] = [];
    }
    acc[schedule.date].push(schedule);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedSchedules).sort();

  const getTypeColor = (type) => {
    switch (type) {
      case 'regular':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400';
      case 'workshop':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400';
      case 'event':
        return 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'regular':
        return 'Latihan Rutin';
      case 'workshop':
        return 'Workshop';
      case 'event':
        return 'Event Khusus';
      default:
        return type;
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Jadwal Kegiatan
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Kelola dan lihat jadwal ekstrakurikuler kamu
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedFilter === filter
                    ? 'bg-sky-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {filterLabels[filter]}
              </button>
            ))}
          </div>
        </div>

        {filteredSchedules.length === 0 ? (
          <Card className="p-12 text-center">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Tidak ada jadwal
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {mySchedules.length === 0
                ? 'Bergabung dengan ekstrakurikuler untuk melihat jadwal'
                : 'Tidak ada jadwal untuk filter yang dipilih'}
            </p>
          </Card>
        ) : (
          <div className="space-y-8">
            {sortedDates.map(date => (
              <div key={date}>
                <div className="flex items-center mb-4">
                  <Calendar className="h-5 w-5 text-sky-500 mr-2" />
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    {new Date(date).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </h2>
                </div>

                <div className="space-y-4">
                  {groupedSchedules[date].map(schedule => (
                    <Card
                      key={schedule.id}
                      hover
                      onClick={() => onNavigate('schedule-detail', schedule.id)}
                      className="p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                              {schedule.title}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(schedule.type)}`}>
                              {getTypeLabel(schedule.type)}
                            </span>
                          </div>
                          <p className="text-sky-600 dark:text-sky-400 font-medium mb-3">
                            {schedule.ekskulName}
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {schedule.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Clock className="h-4 w-4 mr-2 text-sky-500" />
                          <span>{schedule.startTime} - {schedule.endTime}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <MapPin className="h-4 w-4 mr-2 text-sky-500" />
                          <span>{schedule.location}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
