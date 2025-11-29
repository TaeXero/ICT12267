// -------------------- ฟังก์ชันสำหรับปุ่มเลื่อน (Scroll Buttons) --------------------

// 1. ดึงองค์ประกอบของปุ่ม
const topBtn = document.getElementById("scrollToTopBtn");
const bottomBtn = document.getElementById("scrollToBottomBtn");

// 2. ฟังก์ชันหลักสำหรับจัดการการแสดงปุ่ม
function scrollFunction() {
    // ถ้าผู้ใช้เลื่อนหน้าจอลงมามากกว่า 300px
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        topBtn.style.display = "block"; // แสดงปุ่มเลื่อนขึ้น
    } else {
        topBtn.style.display = "none"; // ซ่อนปุ่มเลื่อนขึ้น
    }

    // สำหรับปุ่มเลื่อนลง: ซ่อนปุ่มลงเมื่อถึงด้านล่างสุดของหน้าแล้ว
    const isAtBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 5; 
    if (isAtBottom) {
         bottomBtn.style.display = "none";
    } else {
        bottomBtn.style.display = "block"; // แสดงปุ่มเลื่อนลง
    }

    // หมายเหตุ: สำหรับ animals.html, ถ้าหน้าเว็บไม่ยาวมากพอ คุณอาจไม่เห็นปุ่มขึ้น
    // และปุ่มลงจะแสดงอยู่ตลอด ยกเว้นตอนที่อยู่ด้านล่างสุด 
}

// 3. ผูกฟังก์ชันเข้ากับ Event การเลื่อนหน้าจอ
window.onscroll = function() {
    // ตรวจสอบว่ามีการโหลดฟังก์ชัน Quiz/Counter (ถ้า script.js ถูกใช้ร่วมกัน)
    // แล้วรันฟังก์ชัน scrollFunction() เพิ่ม
    scrollFunction(); 
};

// 4. ฟังก์ชันสำหรับการคลิกปุ่ม
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // เลื่อนแบบนุ่มนวล
    });
}

function scrollToBottom() {
    window.scrollTo({
        top: document.body.scrollHeight, // เลื่อนไปยังความสูงทั้งหมดของ Body
        behavior: 'smooth' // เลื่อนแบบนุ่มนวล
    });
}

// 5. ผูกฟังก์ชันการคลิกเข้ากับปุ่ม
topBtn.addEventListener("click", scrollToTop);
bottomBtn.addEventListener("click", scrollToBottom);