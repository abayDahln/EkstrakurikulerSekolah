import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
	FiEdit2,
	FiSave,
	FiX,
	FiCamera,
	FiUser,
	FiMail,
	FiAward,
	FiCalendar,
	FiUsers,
	FiTrendingUp,
	FiArrowRight,
} from "react-icons/fi";

const SkeletonProfile = ({ darkMode }) => (
	<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
		<div
			className={`rounded-2xl shadow-lg p-6 flex flex-col justify-between ${
				darkMode ? "bg-slate-800" : "bg-white"
			} lg:row-span-2`}
		>
			<div className="text-center">
				<div className="relative inline-block mb-4">
					<div
						className={`w-32 h-32 rounded-full animate-pulse mx-auto ${
							darkMode ? "bg-slate-700" : "bg-slate-200"
						}`}
					/>
				</div>

				<div
					className={`h-8 w-48 rounded animate-pulse mx-auto mb-2 ${
						darkMode ? "bg-slate-700" : "bg-slate-200"
					}`}
				/>
				<div
					className={`h-4 w-64 rounded animate-pulse mx-auto mb-4 ${
						darkMode ? "bg-slate-700" : "bg-slate-200"
					}`}
				/>

				<div
					className={`h-10 w-32 rounded-full animate-pulse mx-auto ${
						darkMode ? "bg-slate-700" : "bg-slate-200"
					}`}
				/>

				<div
					className={`mt-6 pt-6 border-t ${
						darkMode ? "border-slate-700" : "border-slate-200"
					}`}
				>
					<div
						className={`h-3 w-24 rounded animate-pulse mx-auto mb-2 ${
							darkMode ? "bg-slate-700" : "bg-slate-200"
						}`}
					/>
					<div
						className={`h-5 w-36 rounded animate-pulse mx-auto ${
							darkMode ? "bg-slate-700" : "bg-slate-200"
						}`}
					/>
				</div>
			</div>
		</div>

		<div className="lg:col-span-2 flex flex-col gap-6">
			<div
				className={`rounded-2xl shadow-lg p-6 ${
					darkMode ? "bg-slate-800" : "bg-white"
				}`}
			>
				<div className="flex items-center justify-between mb-6">
					<div
						className={`h-7 w-48 rounded animate-pulse ${
							darkMode ? "bg-slate-700" : "bg-slate-200"
						}`}
					/>
					<div
						className={`h-10 w-24 rounded-lg animate-pulse ${
							darkMode ? "bg-slate-700" : "bg-slate-200"
						}`}
					/>
				</div>

				<div className="space-y-4">
					<div>
						<div
							className={`h-5 w-32 rounded animate-pulse mb-2 ${
								darkMode ? "bg-slate-700" : "bg-slate-200"
							}`}
						/>
						<div
							className={`h-12 w-full rounded-xl animate-pulse ${
								darkMode ? "bg-slate-700" : "bg-slate-200"
							}`}
						/>
					</div>
					<div>
						<div
							className={`h-5 w-20 rounded animate-pulse mb-2 ${
								darkMode ? "bg-slate-700" : "bg-slate-200"
							}`}
						/>
						<div
							className={`h-12 w-full rounded-xl animate-pulse ${
								darkMode ? "bg-slate-700" : "bg-slate-200"
							}`}
						/>
					</div>
				</div>
			</div>

			<div
				className={`rounded-2xl shadow-lg p-6 ${
					darkMode ? "bg-slate-800" : "bg-white"
				}`}
			>
				<div
					className={`h-7 w-48 rounded animate-pulse mb-6 ${
						darkMode ? "bg-slate-700" : "bg-slate-200"
					}`}
				/>

				<div className="grid grid-cols-2 gap-4">
					{[...Array(4)].map((_, index) => (
						<div
							key={index}
							className={`p-4 rounded-xl ${
								darkMode ? "bg-slate-700/50" : "bg-slate-50"
							}`}
						>
							<div className="flex items-center gap-2 mb-2">
								<div
									className={`w-10 h-10 rounded-lg animate-pulse ${
										darkMode ? "bg-slate-600" : "bg-slate-200"
									}`}
								/>
							</div>
							<div
								className={`h-8 w-16 rounded animate-pulse mb-1 ${
									darkMode ? "bg-slate-600" : "bg-slate-300"
								}`}
							/>
							<div
								className={`h-4 w-20 rounded animate-pulse ${
									darkMode ? "bg-slate-600" : "bg-slate-300"
								}`}
							/>
						</div>
					))}
				</div>
			</div>
		</div>

		<div
			className={`lg:col-span-3 rounded-2xl shadow-lg p-6 ${
				darkMode ? "bg-slate-800" : "bg-white"
			}`}
		>
			<div
				className={`h-7 w-64 rounded animate-pulse mb-6 ${
					darkMode ? "bg-slate-700" : "bg-slate-200"
				}`}
			/>

			<div className="space-y-4">
				{[...Array(2)].map((_, index) => (
					<div
						key={index}
						className={`flex items-center gap-4 p-4 rounded-xl ${
							darkMode ? "bg-slate-700/50" : "bg-slate-50"
						}`}
					>
						<div
							className={`w-16 h-16 rounded-xl animate-pulse ${
								darkMode ? "bg-slate-600" : "bg-slate-200"
							}`}
						/>
						<div className="flex-1 space-y-2">
							<div className="flex items-center justify-between">
								<div
									className={`h-6 w-32 rounded animate-pulse ${
										darkMode ? "bg-slate-600" : "bg-slate-300"
									}`}
								/>
								<div
									className={`w-5 h-5 rounded animate-pulse ${
										darkMode ? "bg-slate-600" : "bg-slate-300"
									}`}
								/>
							</div>
							<div
								className={`h-4 w-48 rounded animate-pulse ${
									darkMode ? "bg-slate-600" : "bg-slate-300"
								}`}
							/>
							<div className="flex gap-3">
								<div
									className={`h-6 w-24 rounded-full animate-pulse ${
										darkMode ? "bg-slate-600" : "bg-slate-300"
									}`}
								/>
								<div
									className={`h-6 w-20 rounded-full animate-pulse ${
										darkMode ? "bg-slate-600" : "bg-slate-300"
									}`}
								/>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	</div>
);

const MyProfile = ({ darkMode }) => {
	const [activeMenu, setActiveMenu] = useState(6);
	const [profileData, setProfileData] = useState(null);
	const [isEditingInfo, setIsEditingInfo] = useState(false);
	const [isEditingPhoto, setIsEditingPhoto] = useState(false);
	const [isInitialLoad, setIsInitialLoad] = useState(true);
	const [isServerDown, setIsServerDown] = useState(false);
	const [formData, setFormData] = useState({ name: "", email: "" });
	const [selectedImage, setSelectedImage] = useState(null);
	const [previewImage, setPreviewImage] = useState(null);
	const fileInputRef = useRef(null);
	const navigate = useNavigate();

	const API_URL = "http://localhost:5000";
	const intervalRef = useRef(null);

	const fetchProfileData = async () => {
		try {
			const token =
				localStorage.getItem("token") || sessionStorage.getItem("token");
			const response = await fetch(`${API_URL}/api/profile`, {
				headers: { Authorization: `Bearer ${token}` },
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();

			if (result.status === 200) {
				setProfileData(result.data);
				setFormData({ name: result.data.name, email: result.data.email });
				setIsServerDown(false);
			}
			if (isInitialLoad) setIsInitialLoad(false);
		} catch (error) {
			console.error("Error fetching profile:", error);
			setIsServerDown(true);
			if (isInitialLoad) setIsInitialLoad(false);
		}
	};

	useEffect(() => {
		setTimeout(() => {
			fetchProfileData();
		}, 1300);

		intervalRef.current = setInterval(fetchProfileData, 30000);

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, []);

	const handleSaveInfo = async () => {
		try {
			const token =
				localStorage.getItem("token") || sessionStorage.getItem("token");

			const response = await fetch(`${API_URL}/api/profile`, {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				const result = await response.json();
				setIsEditingInfo(false);
				fetchProfileData();
				alert(result.message || "Profile berhasil diupdate!");
			} else {
				throw new Error("Failed to update profile");
			}
		} catch (error) {
			console.error("Error updating profile:", error);
			alert("Gagal update profile");
		}
	};

	const handleSavePhoto = async () => {
		if (!selectedImage) {
			alert("Pilih foto terlebih dahulu");
			return;
		}

		try {
			const token =
				localStorage.getItem("token") || sessionStorage.getItem("token");
			const photoFormData = new FormData();
			photoFormData.append("image", selectedImage);

			const response = await fetch(`${API_URL}/api/profile/photo`, {
				method: "PUT",
				headers: { Authorization: `Bearer ${token}` },
				body: photoFormData,
			});

			if (response.ok) {
				const result = await response.json();
				setIsEditingPhoto(false);
				setSelectedImage(null);
				setPreviewImage(null);
				fetchProfileData();
				alert(result.message || "Foto profil berhasil diupdate!");
			} else {
				throw new Error("Failed to update photo");
			}
		} catch (error) {
			console.error("Error updating photo:", error);
			alert("Gagal update foto profil");
		}
	};

	const handleImageChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];

			if (file.size > 5 * 1024 * 1024) {
				alert("Ukuran file maksimal 5MB");
				return;
			}

			if (!file.type.startsWith("image/")) {
				alert("File harus berupa gambar");
				return;
			}

			setSelectedImage(file);
			setPreviewImage(URL.createObjectURL(file));
		}
	};

	const cancelPhotoEdit = () => {
		setIsEditingPhoto(false);
		setSelectedImage(null);
		setPreviewImage(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	const triggerFileInput = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleEkskulClick = (ekskulId) => {
		navigate(`/extracurricular/${ekskulId}`);
	};

	const calculateTotalStudents = () => {
		if (!profileData?.managedExtracurriculars) return 0;
		return profileData.managedExtracurriculars.reduce(
			(total, ekskul) => total + (ekskul.totalMembers || 0),
			0
		);
	};

	return (
		<div className="p-8">
			<div className="max-w-5xl mx-auto">
				<div className="mb-8">
					<h1
						className={`text-3xl font-bold mb-2 ${
							darkMode ? "text-white" : "text-slate-900"
						}`}
					>
						<FiUser className="inline mr-2 mb-1" />
						My Profile
					</h1>
					<p
						className={`text-sm ${
							darkMode ? "text-slate-400" : "text-slate-500"
						}`}
					>
						Kelola informasi profil pembina
					</p>
				</div>

				{isServerDown || !profileData ? (
					<SkeletonProfile darkMode={darkMode} />
				) : (
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						<div
							className={`rounded-2xl shadow-lg p-6 flex flex-col justify-between
      ${darkMode ? "bg-slate-800" : "bg-white"}`}
						>
							<div className="text-center">
								<div className="relative inline-block mb-4">
									<img
										src={previewImage || `${API_URL}/${profileData.profileUrl}`}
										alt={profileData.name}
										className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-sky-500"
										onError={(e) => {
											e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
												profileData.name
											)}&background=0ea5e9&color=fff&size=128`;
										}}
									/>
									{!isEditingPhoto ? (
										<button
											onClick={() => setIsEditingPhoto(true)}
											className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
										>
											<FiCamera className="text-lg" />
										</button>
									) : (
										<div className="absolute -bottom-2 -right-2 flex gap-1">
											<button
												onClick={handleSavePhoto}
												disabled={!selectedImage}
												className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
													!selectedImage
														? "bg-gray-400 cursor-not-allowed"
														: "bg-green-500 hover:bg-green-600"
												} text-white`}
											>
												<FiSave className="text-sm" />
											</button>
											<button
												onClick={cancelPhotoEdit}
												className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600"
											>
												<FiX className="text-sm" />
											</button>
										</div>
									)}
									<input
										ref={fileInputRef}
										type="file"
										accept="image/*"
										onChange={handleImageChange}
										className="hidden"
									/>
								</div>

								{isEditingPhoto && (
									<button
										onClick={triggerFileInput}
										className={`mb-4 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
											darkMode
												? "bg-slate-700 hover:bg-slate-600 text-white"
												: "bg-slate-100 hover:bg-slate-200 text-slate-700"
										}`}
									>
										<FiCamera className="inline mr-2" />
										Pilih Foto
									</button>
								)}

								<h2
									className={`text-2xl font-bold mb-1 ${
										darkMode ? "text-white" : "text-slate-900"
									}`}
								>
									{profileData.name}
								</h2>
								<p
									className={`text-sm mb-4 ${
										darkMode ? "text-slate-400" : "text-slate-500"
									}`}
								>
									{profileData.email}
								</p>

								<div
									className={`inline-block px-4 py-2 rounded-full font-semibold ${
										darkMode
											? "bg-purple-900/50 text-purple-300"
											: "bg-purple-100 text-purple-600"
									}`}
								>
									<FiAward className="inline mr-1 mb-1" />
									Pembina
								</div>

								<div
									className={`mt-6 pt-6 border-t ${
										darkMode ? "border-slate-700" : "border-slate-200"
									}`}
								>
									<p
										className={`text-xs flex items-center justify-center gap-1 mb-1 ${
											darkMode ? "text-slate-500" : "text-slate-400"
										}`}
									>
										<FiCalendar className="text-xs" />
										Bergabung sejak
									</p>
									<p
										className={`font-semibold ${
											darkMode ? "text-slate-300" : "text-slate-600"
										}`}
									>
										{new Date(profileData.createdAt).toLocaleDateString(
											"id-ID",
											{
												day: "numeric",
												month: "long",
												year: "numeric",
											}
										)}
									</p>
								</div>
							</div>
						</div>

						<div className="lg:col-span-2 flex flex-col gap-6">
							<div
								className={`rounded-2xl shadow-lg p-6 ${
									darkMode ? "bg-slate-800" : "bg-white"
								}`}
							>
								<div className="flex items-center justify-between mb-6">
									<h3
										className={`text-xl font-bold ${
											darkMode ? "text-white" : "text-slate-900"
										}`}
									>
										Informasi Pribadi
									</h3>
									{!isEditingInfo ? (
										<button
											onClick={() => setIsEditingInfo(true)}
											className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors ${
												darkMode
													? "bg-slate-700 hover:bg-slate-600 text-white"
													: "bg-slate-100 hover:bg-slate-200 text-slate-700"
											}`}
										>
											<FiEdit2 /> Edit
										</button>
									) : (
										<div className="flex gap-2">
											<button
												onClick={() => {
													setIsEditingInfo(false);
													setFormData({
														name: profileData.name,
														email: profileData.email,
													});
												}}
												className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors ${
													darkMode
														? "bg-slate-700 hover:bg-slate-600 text-white"
														: "bg-slate-200 hover:bg-slate-300 text-slate-700"
												}`}
											>
												<FiX /> Batal
											</button>
											<button
												onClick={handleSaveInfo}
												className="px-4 py-2 rounded-lg font-semibold flex items-center gap-2 bg-gradient-to-r from-sky-500 to-cyan-500 text-white hover:shadow-lg transition-all"
											>
												<FiSave /> Simpan
											</button>
										</div>
									)}
								</div>

								<div className="space-y-4">
									<div>
										<label
											className={`block text-sm font-semibold mb-2 flex items-center gap-2 ${
												darkMode ? "text-slate-300" : "text-slate-700"
											}`}
										>
											<FiUser /> Nama Lengkap
										</label>
										{isEditingInfo ? (
											<input
												type="text"
												value={formData.name}
												onChange={(e) =>
													setFormData({ ...formData, name: e.target.value })
												}
												className={`w-full p-3 rounded-xl border-2 transition-all ${
													darkMode
														? "bg-slate-700 border-slate-600 text-white"
														: "bg-white border-slate-200"
												} focus:outline-none focus:ring-4 ${
													darkMode
														? "focus:ring-sky-900/50 focus:border-sky-500"
														: "focus:ring-sky-100 focus:border-sky-500"
												}`}
											/>
										) : (
											<p
												className={`text-lg ${
													darkMode ? "text-white" : "text-slate-900"
												}`}
											>
												{profileData.name}
											</p>
										)}
									</div>

									<div>
										<label
											className={`block text-sm font-semibold mb-2 flex items-center gap-2 ${
												darkMode ? "text-slate-300" : "text-slate-700"
											}`}
										>
											<FiMail /> Email
										</label>
										{isEditingInfo ? (
											<input
												type="email"
												value={formData.email}
												onChange={(e) =>
													setFormData({ ...formData, email: e.target.value })
												}
												className={`w-full p-3 rounded-xl border-2 transition-all ${
													darkMode
														? "bg-slate-700 border-slate-600 text-white"
														: "bg-white border-slate-200"
												} focus:outline-none focus:ring-4 ${
													darkMode
														? "focus:ring-sky-900/50 focus:border-sky-500"
														: "focus:ring-sky-100 focus:border-sky-500"
												}`}
											/>
										) : (
											<p
												className={`text-lg ${
													darkMode ? "text-white" : "text-slate-900"
												}`}
											>
												{profileData.email}
											</p>
										)}
									</div>
								</div>
							</div>

							<div
								className={`rounded-2xl shadow-lg p-6 ${
									darkMode ? "bg-slate-800" : "bg-white"
								}`}
							>
								<h3
									className={`text-xl font-bold mb-6 flex items-center gap-2 ${
										darkMode ? "text-white" : "text-slate-900"
									}`}
								>
									<FiTrendingUp /> Statistik Aktivitas
								</h3>

								<div className="grid grid-cols-2 gap-4">
									<div
										className={`p-4 rounded-xl ${
											darkMode ? "bg-slate-700/50" : "bg-slate-50"
										}`}
									>
										<div className="flex items-center gap-2 mb-2">
											<div
												className={`w-10 h-10 rounded-lg flex items-center justify-center ${
													darkMode
														? "bg-sky-900/50 text-sky-300"
														: "bg-sky-100 text-sky-600"
												}`}
											>
												<FiAward className="text-xl" />
											</div>
										</div>
										<p
											className={`text-2xl font-bold mb-1 ${
												darkMode ? "text-white" : "text-slate-900"
											}`}
										>
											{profileData.activityStats
												?.totalManagedExtracurriculars || 0}
										</p>
										<p
											className={`text-sm ${
												darkMode ? "text-slate-400" : "text-slate-500"
											}`}
										>
											Ekskul Dikelola
										</p>
									</div>

									<div
										className={`p-4 rounded-xl ${
											darkMode ? "bg-slate-700/50" : "bg-slate-50"
										}`}
									>
										<div className="flex items-center gap-2 mb-2">
											<div
												className={`w-10 h-10 rounded-lg flex items-center justify-center ${
													darkMode
														? "bg-purple-900/50 text-purple-300"
														: "bg-purple-100 text-purple-600"
												}`}
											>
												<FiCalendar className="text-xl" />
											</div>
										</div>
										<p
											className={`text-2xl font-bold mb-1 ${
												darkMode ? "text-white" : "text-slate-900"
											}`}
										>
											{profileData.activityStats?.totalSchedulesCreated || 0}
										</p>
										<p
											className={`text-sm ${
												darkMode ? "text-slate-400" : "text-slate-500"
											}`}
										>
											Jadwal Dibuat
										</p>
									</div>

									<div
										className={`p-4 rounded-xl ${
											darkMode ? "bg-slate-700/50" : "bg-slate-50"
										}`}
									>
										<div className="flex items-center gap-2 mb-2">
											<div
												className={`w-10 h-10 rounded-lg flex items-center justify-center ${
													darkMode
														? "bg-green-900/50 text-green-300"
														: "bg-green-100 text-green-600"
												}`}
											>
												<FiUsers className="text-xl" />
											</div>
										</div>
										<p
											className={`text-2xl font-bold mb-1 ${
												darkMode ? "text-white" : "text-slate-900"
											}`}
										>
											{calculateTotalStudents()}
										</p>
										<p
											className={`text-sm ${
												darkMode ? "text-slate-400" : "text-slate-500"
											}`}
										>
											Total Siswa
										</p>
									</div>

									<div
										className={`p-4 rounded-xl ${
											darkMode ? "bg-slate-700/50" : "bg-slate-50"
										}`}
									>
										<div className="flex items-center gap-2 mb-2">
											<div
												className={`w-10 h-10 rounded-lg flex items-center justify-center ${
													darkMode
														? "bg-orange-900/50 text-orange-300"
														: "bg-orange-100 text-orange-600"
												}`}
											>
												<FiCalendar className="text-xl" />
											</div>
										</div>
										<p
											className={`text-2xl font-bold mb-1 ${
												darkMode ? "text-white" : "text-slate-900"
											}`}
										>
											{profileData.activityStats?.upcomingSchedules || 0}
										</p>
										<p
											className={`text-sm ${
												darkMode ? "text-slate-400" : "text-slate-500"
											}`}
										>
											Jadwal Mendatang
										</p>
									</div>
								</div>
							</div>
						</div>

						<div
							className={`lg:col-span-3 rounded-2xl shadow-lg p-6 ${
								darkMode ? "bg-slate-800" : "bg-white"
							}`}
						>
							<h3
								className={`text-xl font-bold mb-6 ${
									darkMode ? "text-white" : "text-slate-900"
								}`}
							>
								Ekstrakurikuler yang Dikelola
							</h3>

							<div className="space-y-4">
								{profileData.managedExtracurriculars?.length > 0 ? (
									profileData.managedExtracurriculars.map((ekskul) => (
										<div
											key={ekskul.id}
											className={`flex items-center gap-4 p-4 rounded-xl transition-all hover:scale-[1.02] cursor-pointer group ${
												darkMode
													? "bg-slate-700/50 hover:bg-slate-700"
													: "bg-slate-50 hover:bg-slate-100"
											}`}
											onClick={() => handleEkskulClick(ekskul.id)}
										>
											<img
												src={`${API_URL}/${ekskul.imageUrl}`}
												alt={ekskul.name}
												className="w-16 h-16 rounded-xl object-cover"
												onError={(e) => {
													e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
														ekskul.name
													)}&background=0ea5e9&color=fff&size=64`;
												}}
											/>
											<div className="flex-1">
												<div className="flex items-center justify-between">
													<h4
														className={`font-bold ${
															darkMode ? "text-white" : "text-slate-900"
														}`}
													>
														{ekskul.name}
													</h4>
													<FiArrowRight
														className={`transition-transform group-hover:translate-x-1 ${
															darkMode ? "text-slate-400" : "text-slate-500"
														}`}
													/>
												</div>
												<p
													className={`text-sm ${
														darkMode ? "text-slate-400" : "text-slate-500"
													}`}
												>
													{ekskul.description}
												</p>
												<div className="flex gap-3 mt-2">
													<span
														className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
															darkMode
																? "bg-sky-900/50 text-sky-300"
																: "bg-sky-100 text-sky-600"
														}`}
													>
														<FiUsers className="text-xs" />
														{ekskul.totalMembers} anggota
													</span>
													<span
														className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
															darkMode
																? "bg-purple-900/50 text-purple-300"
																: "bg-purple-100 text-purple-600"
														}`}
													>
														<FiCalendar className="text-xs" />
														{ekskul.totalSchedules} jadwal
													</span>
												</div>
											</div>
										</div>
									))
								) : (
									<p
										className={`text-center py-4 ${
											darkMode ? "text-slate-400" : "text-slate-500"
										}`}
									>
										Tidak ada ekstrakurikuler yang dikelola
									</p>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default MyProfile;
