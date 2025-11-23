import React, { useState, useEffect } from "react";
import { getToken } from "../../utils/utils";
import { motion } from "framer-motion";

const API_URL = "http://localhost:5000/api/pembina";
const DEFAULT_AVATAR = "/orang.png";

export function MemberCard() {
  const [member, setMember] = useState([]);
  const [listEkskul, setListEkskul] = useState([]);
  const [selectedEkskul, setSelectedEkskul] = useState("");
  const token = getToken();

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await fetch(`${API_URL}/member`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const json = await res.json();
        if (json.status === 200) {
          setMember(json.data);

          const ekskulMap = {};
          json.data.forEach((item) => {
            if (item.extracurricular) {
              ekskulMap[item.extracurricular.id] = item.extracurricular.name;
            }
          });

          const ekskulList = Object.entries(ekskulMap).map(([id, name]) => ({
            id,
            name
          }));

          setListEkskul(ekskulList);

          if (!selectedEkskul && ekskulList.length > 0) {
            setSelectedEkskul(ekskulList[0].id);
          }
        }
      } catch (err) {
        console.error("Error fetch member:", err);
      }
    };

    fetchMember();
  }, [token]);

  const filteredMember = selectedEkskul
    ? member.filter(
        (m) => String(m.extracurricular?.id) === String(selectedEkskul)
      )
    : member;

  return (
    <motion.div
      initial={{ y: 400, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="gap-5 rounded-lg p-4 flex flex-col bg-white" >
      <div className="font-extrabold text-4xl text-blue-700 text-center">
        Daftar Member
      </div>

      <div>
        <select
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full"
          value={selectedEkskul}
          onChange={(e) => setSelectedEkskul(e.target.value)} >
          {listEkskul.map((ex) => (
            <option key={ex.id} value={ex.id}>
              {ex.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 grid-cols-1 gap-10 w-full mt-4">
        {filteredMember.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg bg-white mb-2 w-70 flex flex-col" >
            <div className="bg-blue-500 rounded-tl-md rounded-tr-md p-2 flex justify-center">
              <img
                src={
                  item.profileUrl
                    ? `http://localhost:5000/${item.profileUrl}`
                    : DEFAULT_AVATAR
                }
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = DEFAULT_AVATAR;
                }}
                className="border border-blue-300 border-4 w-20 h-20 rounded-full"
                alt="profile" />
            </div>

            <div className="flex flex-col justify-center text-center pb-3">
              <div className="font-extrabold text-lg">{item.name}</div>
              <div className="font-semibold text-md">{item.email}</div>
              <div className="text-sm text-blue-500">
                Ekskul: <strong>{item.extracurricular?.name}</strong>
              </div>
              <div className="text-sm text-blue-500">
                Total Poin: <strong>{item.totalPoints}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
