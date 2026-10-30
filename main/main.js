// =========================================================================
// ==================== BÀI 1: QUẢN LÝ TUYỂN SINH ==========================
// =========================================================================

// Biến lưu trữ khu vực và đối tượng người dùng chọn (mặc định rỗng tương ứng 0 điểm)
let selectedArea = "";
let selectedTarget = "";

// Hàm cập nhật khu vực được chọn và ẩn dropdown
function chooseArea(areaCode, displayName) {
  selectedArea = areaCode;
  document.getElementById("txtArea").textContent = displayName;
  document.getElementById("dropdownArea").classList.add("hidden");
}

// Bắt sự kiện .onclick trực tiếp bằng ID cho từng mục Khu vực
document.getElementById("optAreaNone").onclick = function () {
  chooseArea("", "Không chọn khu vực");
};
document.getElementById("optAreaA").onclick = function () {
  chooseArea("A", "Khu vực: A");
};
document.getElementById("optAreaB").onclick = function () {
  chooseArea("B", "Khu vực: B");
};
document.getElementById("optAreaC").onclick = function () {
  chooseArea("C", "Khu vực: C");
};

// Hàm cập nhật đối tượng được chọn và ẩn dropdown
function chooseTarget(targetCode, displayName) {
  selectedTarget = targetCode;
  document.getElementById("txtTarget").textContent = displayName;
  document.getElementById("dropdownTarget").classList.add("hidden");
}

// Bắt sự kiện .onclick trực tiếp bằng ID cho từng mục Đối tượng
document.getElementById("optTargetNone").onclick = function () {
  chooseTarget("", "Không chọn đối tượng");
};
document.getElementById("optTarget1").onclick = function () {
  chooseTarget("1", "Đối tượng: 1");
};
document.getElementById("optTarget2").onclick = function () {
  chooseTarget("2", "Đối tượng: 2");
};
document.getElementById("optTarget3").onclick = function () {
  chooseTarget("3", "Đối tượng: 3");
};

// Hàm kiểm tra xem thí sinh có môn nào bị điểm 0 (điểm liệt) hay không
function checkEliminationScore(score1, score2, score3) {
  if (score1 === 0 || score2 === 0 || score3 === 0) {
    return true; // Có môn bị điểm 0
  }
  return false; // Không có môn nào bị điểm 0
}

// Hàm tính điểm ưu tiên theo khu vực
function calcAreaPriorityScore(area) {
  let score = 0;
  if (area === "A") {
    score = 2;
  } else if (area === "B") {
    score = 1;
  } else if (area === "C") {
    score = 0.5;
  } else {
    score = 0; // Không thuộc khu vực ưu tiên
  }
  return score;
}

// Hàm tính điểm ưu tiên theo đối tượng
function calcTargetPriorityScore(target) {
  let score = 0;
  if (target === "1") {
    score = 2.5;
  } else if (target === "2") {
    score = 1.5;
  } else if (target === "3") {
    score = 1;
  } else {
    score = 0; // Không thuộc đối tượng ưu tiên
  }
  return score;
}

// Hàm tính tổng điểm thi của thí sinh
function calcTotalAdmissionScore(score1, score2, score3, areaPriority, targetPriority) {
  return score1 + score2 + score3 + areaPriority + targetPriority;
}

// Hàm chính: Xử lý xét tuyển và hiển thị kết quả ra giao diện
function handleAdmissionProcess() {
  const benchmarkScore = document.getElementById("benchmarkScore").value * 1;
  const score1 = document.getElementById("subjectScore1").value * 1;
  const score2 = document.getElementById("subjectScore2").value * 1;
  const score3 = document.getElementById("subjectScore3").value * 1;
  const resultEl = document.getElementById("admissionResult");

  // Kiểm tra điểm liệt
  if (checkEliminationScore(score1, score2, score3)) {
    resultEl.className =
      "p-4 rounded-xl text-center text-base font-semibold border bg-red-100 text-red-800 border-red-300 block";
    resultEl.innerHTML = "Bạn đã <strong>RỚT</strong> (do có môn thi bị điểm 0).";
  } else {
    const areaScore = calcAreaPriorityScore(selectedArea);
    const targetScore = calcTargetPriorityScore(selectedTarget);
    const totalScore = calcTotalAdmissionScore(score1, score2, score3, areaScore, targetScore);

    if (totalScore >= benchmarkScore) {
      resultEl.className =
        "p-4 rounded-xl text-center text-base font-semibold border bg-green-100 text-green-800 border-green-300 block";
      resultEl.innerHTML = "Bạn đã <strong>ĐẬU</strong>. Tổng điểm đạt được: " + totalScore;
    } else {
      resultEl.className =
        "p-4 rounded-xl text-center text-base font-semibold border bg-red-100 text-red-800 border-red-300 block";
      resultEl.innerHTML = "Bạn đã <strong>RỚT</strong>. Tổng điểm đạt được: " + totalScore;
    }
  }
}
document.getElementById("btnAdmissionResult").onclick = handleAdmissionProcess;


// =========================================================================
// ==================== BÀI 2: TÍNH TIỀN ĐIỆN ==============================
// =========================================================================

// Hàm tính tiền điện theo từng bậc luỹ tiến
function calcElectricBill(kw) {
  let total = 0;

  if (kw <= 50) {
    total = kw * 500;
  } else if (kw <= 100) {
    total = 50 * 500 + (kw - 50) * 650;
  } else if (kw <= 200) {
    total = 50 * 500 + 50 * 650 + (kw - 100) * 850;
  } else if (kw <= 350) {
    total = 50 * 500 + 50 * 650 + 100 * 850 + (kw - 200) * 1100;
  } else {
    total = 50 * 500 + 50 * 650 + 100 * 850 + 150 * 1100 + (kw - 350) * 1300;
  }

  return total;
}

// Hàm chính: Xử lý tính tiền điện và hiển thị kết quả ra giao diện
function handleElectricBillProcess() {
  const customerName = document.getElementById("electricCustomerName").value;
  const kw = document.getElementById("electricKwNum").value * 1;
  const resultEl = document.getElementById("electricBillResult");

  const totalBill = calcElectricBill(kw);

  resultEl.className =
    "p-4 rounded-xl text-center text-base font-semibold border bg-green-100 text-green-800 border-green-300 block";
  resultEl.innerHTML = "Họ tên: " + customerName + " - Tiền điện: " + totalBill.toLocaleString() + "đ";
}
document.getElementById("btnCalcElectricBill").onclick = handleElectricBillProcess;


// =========================================================================
// ==================== BÀI 3: TÍNH THUẾ THU NHẬP CÁ NHÂN ==================
// =========================================================================

// Hàm tính thuế suất dựa vào thu nhập chịu thuế
function calcTaxRate(taxableIncome) {
  let rate = 0;

  if (taxableIncome <= 60e6) {
    rate = 0.05; // 5% (đến 60tr)
  } else if (taxableIncome <= 120e6) {
    rate = 0.1; // 10% (trên 60tr đến 120tr)
  } else if (taxableIncome <= 210e6) {
    rate = 0.15; // 15% (trên 120tr đến 210tr)
  } else if (taxableIncome <= 384e6) {
    rate = 0.2; // 20% (trên 210tr đến 384tr)
  } else if (taxableIncome <= 624e6) {
    rate = 0.25; // 25% (trên 384tr đến 624tr)
  } else if (taxableIncome <= 960e6) {
    rate = 0.3; // 30% (trên 624tr đến 960tr)
  } else {
    rate = 0.35; // 35% (trên 960tr)
  }

  return rate;
}

// Hàm tính tiền thuế thu nhập cá nhân
function calcPersonalIncomeTax(totalIncome, dependents) {
  // Thu nhập chịu thuế = Tổng thu nhập năm - 4tr - Số người phụ thuộc * 1.6tr
  const taxableIncome = totalIncome - 4e6 - dependents * 1.6e6;

  if (taxableIncome <= 0) {
    return 0;
  }

  const taxRate = calcTaxRate(taxableIncome);
  return taxableIncome * taxRate;
}

// Hàm chính: Xử lý tính thuế và hiển thị kết quả ra giao diện
function handleTaxProcess() {
  const customerName = document.getElementById("taxCustomerName").value;
  let totalIncome = document.getElementById("totalAnnualIncome").value * 1;
  const dependents = document.getElementById("dependentsCount").value * 1;
  const resultEl = document.getElementById("taxResult");

  // Nếu người dùng nhập dạng triệu (ví dụ 100 thay vì 100000000)
  if (totalIncome > 0 && totalIncome < 10000) {
    totalIncome = totalIncome * 1e6;
  }

  const taxAmount = calcPersonalIncomeTax(totalIncome, dependents);

  resultEl.className =
    "p-4 rounded-xl text-center text-base font-semibold border bg-green-100 text-green-800 border-green-300 block";
  resultEl.innerHTML =
    "Họ tên: " + customerName + " - Tiền thuế TNCN: " + taxAmount.toLocaleString() + "đ";
}
document.getElementById("btnCalcTax").onclick = handleTaxProcess;


// =========================================================================
// ==================== BÀI 4: TÍNH TIỀN CÁP ==============================
// =========================================================================

// Xử lý ẩn/hiện ô nhập số kết nối khi thay đổi loại khách hàng
document.getElementById("cableCustomerType").onchange = function () {
  const customerType = this.value;
  const wrapperConnection = document.getElementById("wrapperConnectionCount");

  if (customerType === "business") {
    wrapperConnection.classList.remove("hidden");
  } else {
    wrapperConnection.classList.add("hidden");
  }
};

// Hàm tính phí dịch vụ cơ bản cho doanh nghiệp
function calcBusinessBasicServiceFee(connections) {
  let fee = 75; // 10 kết nối đầu: 75$
  if (connections > 10) {
    fee = 75 + (connections - 10) * 5; // Mỗi kết nối thêm: 5$
  }
  return fee;
}

// Hàm tính tiền cáp theo loại khách hàng
function calcCableBill(customerType, connections, premiumChannels) {
  let total = 0;

  if (customerType === "residential") {
    // Nhà dân: Phí xử lý 4.5$ + Phí cơ bản 20.5$ + Kênh cao cấp 7.5$/kênh
    total = 4.5 + 20.5 + premiumChannels * 7.5;
  } else if (customerType === "business") {
    // Doanh nghiệp: Phí xử lý 15$ + Phí cơ bản (gọi hàm con) + Kênh cao cấp 50$/kênh
    const basicFee = calcBusinessBasicServiceFee(connections);
    total = 15 + basicFee + premiumChannels * 50;
  }

  return total;
}

// Hàm chính: Xử lý tính tiền cáp và hiển thị kết quả ra giao diện
function handleCableBillProcess() {
  const customerId = document.getElementById("cableCustomerId").value;
  const customerType = document.getElementById("cableCustomerType").value;
  const connections = document.getElementById("connectionCount").value * 1;
  const premiumChannels = document.getElementById("premiumChannelsCount").value * 1;
  const resultEl = document.getElementById("cableBillResult");

  const totalBill = calcCableBill(customerType, connections, premiumChannels);

  resultEl.className =
    "p-4 rounded-xl text-center text-base font-semibold border bg-green-100 text-green-800 border-green-300 block";
  resultEl.innerHTML =
    "Mã khách hàng: " +
    customerId +
    " - Tiền cáp: $" +
    totalBill.toLocaleString("en-US", { minimumFractionDigits: 2 });
}
document.getElementById("btnCalcCableBill").onclick = handleCableBillProcess;
