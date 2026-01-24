import React, { useState, useEffect } from "react";

const toLocalDateStr = (dateInput) => {
	const d = new Date(dateInput);
	const year = d.getFullYear();
	const month = String(d.getMonth() + 1).padStart(2, "0");
	const day = String(d.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
};

export default function Calendar({
	darkMode,
	onDateSelect,
	selectedDate,
	selectedMonth,
	selectedYear,
	scheduleData,
}) {
	const [currentDate, setCurrentDate] = useState(new Date(selectedYear, selectedMonth, 1));

	useEffect(() => {
		setCurrentDate(new Date(selectedYear, selectedMonth, 1));
	}, [selectedMonth, selectedYear]);

	const daysInMonth = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth() + 1,
		0
	).getDate();

	const firstDayOfMonth = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth(),
		1
	).getDay();

	const monthNames = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"Mei",
		"Jun",
		"Jul",
		"Agu",
		"Sep",
		"Okt",
		"Nov",
		"Des",
	];

	const hasSchedule = (day) => {
		const dateStr = toLocalDateStr(
			new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
		);
		return scheduleData?.some((jadwal) => jadwal.localDate === dateStr);
	};

	return (
		<div
			className={`rounded-2xl shadow-lg p-6 ${darkMode ? "bg-slate-800" : "bg-white"
				}`}
		>
			<div className="flex items-center justify-between mb-6">
				<h3
					className={`text-xl font-bold ${darkMode ? "text-white" : "text-slate-800"
						}`}
				>
					Calendar
				</h3>
				<div className="flex gap-2">
					<button
						onClick={() => {
							const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
							const newMonth = newDate.getMonth();
							const newYear = newDate.getFullYear();
							const daysInNewMonth = new Date(newYear, newMonth + 1, 0).getDate();
							const clampedDay = Math.min(selectedDate, daysInNewMonth);
							onDateSelect(clampedDay, newMonth, newYear);
						}}
						className={`p-2 rounded-lg ${darkMode
							? "hover:bg-slate-700 text-white"
							: "hover:bg-slate-100 text-slate-600"
							}`}
					>
						←
					</button>
					<span
						className={`px-3 py-2 text-sm font-semibold ${darkMode ? "text-slate-300" : "text-slate-600"
							}`}
					>
						{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
					</span>
					<button
						onClick={() => {
							const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
							const newMonth = newDate.getMonth();
							const newYear = newDate.getFullYear();
							const daysInNewMonth = new Date(newYear, newMonth + 1, 0).getDate();
							const clampedDay = Math.min(selectedDate, daysInNewMonth);
							onDateSelect(clampedDay, newMonth, newYear);
						}}
						className={`p-2 rounded-lg ${darkMode
							? "hover:bg-slate-700 text-white"
							: "hover:bg-slate-100 text-slate-600"
							}`}
					>
						→
					</button>
				</div>
			</div>

			<div className="grid grid-cols-7 gap-2 mb-3">
				{["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((day) => (
					<div
						key={day}
						className={`text-center text-xs font-semibold ${darkMode ? "text-slate-400" : "text-slate-500"
							}`}
					>
						{day}
					</div>
				))}
			</div>

			<div className="grid grid-cols-7 gap-2">
				{[...Array(firstDayOfMonth)].map((_, i) => (
					<div key={`empty-${i}`} />
				))}
				{[...Array(daysInMonth)].map((_, i) => {
					const day = i + 1;
					const isSelected =
						selectedDate === day &&
						currentDate.getMonth() === selectedMonth &&
						currentDate.getFullYear() === selectedYear;
					const hasEvent = hasSchedule(day);

					return (
						<button
							key={day}
							onClick={() =>
								onDateSelect(
									day,
									currentDate.getMonth(),
									currentDate.getFullYear()
								)
							}
							className={`aspect-square rounded-lg text-sm font-medium transition-all relative ${isSelected
								? darkMode
									? "bg-gradient-to-br from-sky-700 to-cyan-700 text-white shadow-lg"
									: "bg-gradient-to-br from-sky-500 to-cyan-500 text-white shadow-lg"
								: darkMode
									? "hover:bg-slate-700 text-slate-300"
									: "hover:bg-slate-100 text-slate-700"
								}`}
						>
							{day}
							{hasEvent && (
								<span
									className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${isSelected
										? "bg-white"
										: darkMode
											? "bg-sky-400"
											: "bg-sky-500"
										}`}
								/>
							)}
						</button>
					);
				})}
			</div>
		</div>
	);
}
