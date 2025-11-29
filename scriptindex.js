// **ส่วนที่ 2: โค้ด JavaScript** นำไปเพิ่มต่อท้ายไฟล์ "script.js"

// ข้อมูลสถานะสัตว์ 40 ชนิด (จำลองตามข้อมูลใน animals.html)
// สถานะ: CR=วิกฤต, EN=ใกล้สูญพันธุ์, VU=เสี่ยง, NT=เกือบถูกคุกคาม, LC=เสี่ยงน้อย
const animalStatuses = [
    'EN', 'CR', 'VU', 'CR', 'EN', 'CR', 'CR', 'CR', 'EN', 'VU', 
    'CR', 'VU', 'VU', 'EN', 'EN', 'EN', 'VU', 'CR', 'CR', 'VU', 
    'VU', 'VU', 'CR', 'VU', 'LC', 'EN', 'VU', 'CR', 'CR', 'NT', 
    'LC', 'EN', 'NT', 'LC', 'CR', 'LC', 'VU', 'CR', 'CR', 'NT'
];

// ฟังก์ชันสำหรับนับจำนวนสถานะแต่ละประเภท
function countStatuses(statuses) {
    const counts = { 'CR': 0, 'EN': 0, 'VU': 0, 'NT': 0, 'LC': 0 };
    statuses.forEach(status => {
        if (counts.hasOwnProperty(status)) {
            counts[status]++;
        }
    });
    return counts;
}

// ฟังก์ชันสำหรับสร้างและแสดงแผนภูมิ
function renderConservationChart() {
    const statusCounts = countStatuses(animalStatuses);
    
    const data = {
        labels: [
            'วิกฤต (CR)',
            'ใกล้สูญพันธุ์ (EN)',
            'เสี่ยง (VU)',
            'เกือบถูกคุกคาม (NT)',
            'เสี่ยงน้อย (LC)'
        ],
        datasets: [{
            label: 'จำนวนชนิดสัตว์',
            data: [
                statusCounts['CR'], 
                statusCounts['EN'], 
                statusCounts['VU'], 
                statusCounts['NT'], 
                statusCounts['LC']
            ],
            backgroundColor: [
                '#D32F2F', // แดง (CR)
                '#FF9800', // ส้ม (EN)
                '#FFEB3B', // เหลือง (VU)
                '#4CAF50', // เขียว (NT)
                '#00796B'  // เขียวเข้ม (LC)
            ],
            hoverOffset: 4
        }]
    };

    const config = {
        type: 'pie', // ประเภทแผนภูมิวงกลม
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'จำนวนสัตว์ตามสถานะความเสี่ยง (40 ชนิด)'
                }
            }
        },
    };

    // ค้นหา Canvas Element และสร้าง Chart
    const chartContext = document.getElementById('conservationChart').getContext('2d');
    new Chart(chartContext, config);
}
// **ส่วนที่ 2: โค้ด JavaScript** นำไปเพิ่มต่อท้ายไฟล์ "script.js"

// ข้อมูลตัวเลขเป้าหมาย
const statsTarget = [
    { id: 'stat1', target: 4000 },  // ชนิดสัตว์วิกฤต/ใกล้สูญพันธุ์ (ตัวเลขสมมติ)
    { id: 'stat2', target: 10 },    // ล้านเฮกตาร์ป่าไม้หายไป (ตัวเลขสมมติ)
    { id: 'stat3', target: 45000 }  // ชนิดที่ต้องการการอนุรักษ์ (ตัวเลขสมมติ)
];

// ฟังก์ชันสำหรับ animate ตัวเลข
function animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    let start = 0;
    // กำหนดระยะเวลาการนับให้เสร็จใน 2 วินาที (2000 มิลลิวินาที)
    const duration = 2000; 
    const step = Math.ceil(targetValue / (duration / 20)); // คำนวณก้าวการนับ

    const counter = setInterval(() => {
        start += step;
        if (start > targetValue) {
            start = targetValue;
            clearInterval(counter);
        }
        element.textContent = start.toLocaleString(); // แสดงตัวเลขพร้อมเครื่องหมายจุลภาค
    }, 20); // อัปเดตทุก 20 มิลลิวินาที
}

// ฟังก์ชันตรวจสอบว่าส่วน counter อยู่ในหน้าจอหรือไม่ (เพื่อเริ่ม animate เมื่อผู้ใช้เลื่อนมาถึง)
function checkVisibilityAndStart() {
    const counterSection = document.getElementById('stats-counter');
    if (!counterSection) return;

    const sectionPosition = counterSection.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    // ถ้าส่วน counter อยู่ในหน้าจอ (หรืออยู่เหนือขอบล่างของหน้าจอเล็กน้อย)
    if (sectionPosition < screenHeight * 0.8) {
        // เริ่มนับ
        statsTarget.forEach(stat => {
            // ตรวจสอบว่าเคยเริ่มนับไปแล้วหรือไม่ (โดยการดู class)
            if (!document.getElementById(stat.id).classList.contains('counted')) {
                animateCounter(stat.id, stat.target);
                document.getElementById(stat.id).classList.add('counted'); // ทำเครื่องหมายว่านับแล้ว
            }
        });
        // ลบ Event Listener ออกเมื่อนับเสร็จเพื่อประหยัดทรัพยากร
        window.removeEventListener('scroll', checkVisibilityAndStart);
    }
}

// เพิ่ม Event Listener เพื่อตรวจสอบการเลื่อนหน้าจอ (scroll)
window.addEventListener('scroll', checkVisibilityAndStart);

// ตรวจสอบทันทีเมื่อโหลดหน้าเว็บเผื่อว่าส่วน counter อยู่ในหน้าจอตั้งแต่แรก
checkVisibilityAndStart();

// เรียกใช้ฟังก์ชันสร้างแผนภูมิเมื่อหน้าเว็บโหลดเสร็จ
window.addEventListener('load', renderConservationChart);