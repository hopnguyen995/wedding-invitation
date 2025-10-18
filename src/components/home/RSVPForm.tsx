// src/components/RSVPForm.tsx (Bản hoàn chỉnh)

import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { useCountdown } from "../../hooks/useCountdown";

// 🎯 Dán URL Web App Apps Script đã triển khai của bạn vào đây
const RSVP_API_ENDPOINT = 'https://script.google.com/macros/s/AKfycbz5Yb9EQfcMjS6mxcqOsiYftUrfkG5I1_BykLryZ8w4wrpfAxn0vQDZpSDTn4SaSjDuBw/exec';

export interface IRSVPFormProps {
    groom: boolean; // true cho Nhà Trai, false cho Nhà Gái
}

// Hàm mã hóa dữ liệu thành URL-encoded string
const encode = (data: Record<string, string | 'Có' | 'Không' | ''>) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&');
}

const RSVPForm: React.FC<IRSVPFormProps> = ({ groom }) => {
    const targetDate: Date = new Date(import.meta.env.VITE_RSVP_END)
    const timeLeft = useCountdown(targetDate);

    if (!timeLeft) return null; // Ẩn khi hết thời gian

    interface FormData {
        tenCuaBan: string;
        loiChuc: string;
        thamDu: 'Có' | 'Không' | '';
    }

    const initialFormData: FormData = {
        tenCuaBan: '',
        loiChuc: '',
        thamDu: '',
    };

    // KHÓA LƯU TRỮ ĐỘC NHẤT cho mỗi bên
    const STORAGE_KEY = `hasRsvpSubmitted_${groom ? 'groom' : 'bride'}`;

    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasSubmittedBefore, setHasSubmittedBefore] = useState(false);

    // Lưu trữ STT (Form ID) từ Google Sheet
    const [formId, setFormId] = useState<string | null>(null);

    // --- EFFECT: Tải trạng thái và dữ liệu đã lưu ---
    useEffect(() => {
        AOS.init();
        AOS.refresh();

        const submitted = localStorage.getItem(STORAGE_KEY);
        const savedFormId = localStorage.getItem(`formId_${STORAGE_KEY}`);

        if (submitted === 'true' && savedFormId) {
            setHasSubmittedBefore(true);
            setFormId(savedFormId);

            // Load dữ liệu đã lưu
            const savedData = localStorage.getItem(`formData_${STORAGE_KEY}`);
            if (savedData) {
                try {
                    const parsedData = JSON.parse(savedData);
                    setFormData(prev => ({
                        ...prev,
                        tenCuaBan: parsedData.tenCuaBan || '',
                        loiChuc: parsedData.loiChuc || '',
                        thamDu: parsedData.thamDu || '',
                    }));
                } catch (e) {
                    console.error("Lỗi khi đọc dữ liệu form đã lưu:", e);
                }
            }
        }
    }, [STORAGE_KEY]);

    // --- HANDLERS ---
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!formData.thamDu || isSubmitting) return;

        setIsSubmitting(true);

        // Chuẩn bị dữ liệu gửi đi
        const dataToSend = {
            ...formData,
            nguoiMoi: groom ? "Nhà Trai" : "Nhà Gái",
            // Gửi kèm STT/ID để Apps Script xác định Cập nhật hay Thêm mới
            formId: formId || ''
        };

        try {
            const encodedData = encode(dataToSend);

            const response = await fetch(RSVP_API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: encodedData,
            });

            // Đọc phản hồi JSON từ Apps Script
            if (response.ok) {
                const result = await response.json();

                if (result.result === 'success') {
                    // LƯU TRẠNG THÁI VÀ DỮ LIỆU
                    const receivedId = result.formId;
                    setFormId(receivedId);
                    localStorage.setItem(`formId_${STORAGE_KEY}`, receivedId);
                    localStorage.setItem(STORAGE_KEY, 'true');
                    localStorage.setItem(`formData_${STORAGE_KEY}`, JSON.stringify(formData));
                    setHasSubmittedBefore(true);

                    const statusMessage = result.status === 'UPDATED' ? 'CẬP NHẬT' : 'gửi';

                    alert(`Xác nhận tham dự của bạn đã được ${statusMessage} thành công! Cảm ơn bạn.`);
                } else {
                    // Lỗi xử lý từ Script
                    alert(`Lỗi xử lý: ${result.message}`);
                }
            } else {
                // Lỗi HTTP
                alert(`Lỗi gửi dữ liệu (HTTP ${response.status}). Vui lòng kiểm tra lại URL Apps Script.`);
            }

        } catch (error) {
            console.error('Lỗi mạng hoặc server:', error);
            alert('Lỗi kết nối. Vui lòng thử lại sau.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // --- JSX COMPONENTS ---
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const PRIMARY_COLOR_TEXT = '#6fa322'; // Màu xanh lá đậm

    return (
        <div
            className="relative w-full overflow-hidden py-10 px-4 lg:py-16"
            data-aos="fade-up"
            data-aos-duration="2000"
        >

            <div
                className="relative z-10 flex flex-col items-center justify-center 
    mx-auto bg-gradient-to-br from-[#6fa322]/85 to-[#8fbf44]/85
    text-white text-family rounded-3xl shadow-lg shadow-black/10
    border border-white/20 backdrop-blur-[2px]
    w-full max-w-[400px] md:max-w-[550px] p-6 lg:p-8"
            >

                <motion.h1
                    className="text-4xl md:text-5xl font-semibold mb-6 pinyon-script-regular text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Xác Nhận Tham Dự
                </motion.h1>

                <form onSubmit={handleSubmit} className="w-full">
                    <div className="flex flex-col gap-4">

                        {/* 1. Tên của bạn */}
                        <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                            <input type="text" name="tenCuaBan" value={formData.tenCuaBan} onChange={handleInputChange} placeholder="Tên của bạn là?" required
                                className="w-full p-3 border-none rounded-md bg-white text-gray-800 text-base placeholder-gray-500 shadow-inner focus:ring-2 focus:ring-white/80 transition duration-300"
                            />
                        </motion.div>

                        {/* 2. Bạn Có Tham Dự Không? (Dropdown) */}
                        <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: 0.4 }} className="relative">
                            <select name="thamDu" value={formData.thamDu} onChange={handleInputChange} required
                                // CSS HINT MÀU XÁM NHẠT
                                className={`
                                    w-full p-3 border-none rounded-md bg-white text-base shadow-inner 
                                    focus:ring-2 focus:ring-white/80 transition duration-300 appearance-none pr-10 cursor-pointer
                                    ${formData.thamDu === '' ? 'text-gray-400' : 'text-gray-800'}
                                `}
                            >
                                <option value="" disabled>Bạn có thể đến tham dự chứ?</option>
                                <option value="Có">Có, tôi sẽ tham dự</option>
                                <option value="Không">Xin lỗi, tôi bận mất rồi</option>
                            </select>
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 pointer-events-none">▼</span>
                        </motion.div>

                        {/* 3. Gửi lời chúc đến Dâu Rể */}
                        <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: 0.6 }}>
                            <textarea name="loiChuc" value={formData.loiChuc} onChange={handleInputChange} placeholder="Gửi lời chúc (Tùy chọn)" rows={3}
                                className="w-full p-3 border-none rounded-md bg-white text-gray-800 text-base placeholder-gray-500 shadow-inner focus:ring-2 focus:ring-white/80 transition duration-300"
                            />
                        </motion.div>
                    </div>

                    {/* Nút Gửi/Cập Nhật */}
                    <motion.button
                        type="submit"
                        className="flex items-center gap-2 mx-auto mt-5 bg-[#6fa322] text-[#f5efed] font-medium rounded-full px-6 py-2transition p-1 text-lg font-bold uppercase transition duration-300 shadow-xl mt-6 bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ color: PRIMARY_COLOR_TEXT }}
                        disabled={isSubmitting}
                        variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: 0.8 }}
                    >
                        {/* HIỂN THỊ TÊN NÚT DỰA TRÊN TRẠNG THÁI */}
                        {isSubmitting
                            ? "ĐANG GỬI..."
                            : hasSubmittedBefore
                                ? "CẬP NHẬT"
                                : "GỬI NGAY"
                        }
                    </motion.button>
                </form>
            </div>
        </div>
    );
}

export default RSVPForm;