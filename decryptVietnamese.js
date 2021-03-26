function decryptCaesarCipherVietnamese(ct) {
  let result = "";
  let bestScore = 0;

  for (let shift = 0; shift < 26; shift++) {
    let pt = "";

    for (let i = 0; i < ct.length; i++) {
      if (ct[i] == " " || ct[i] == "." || ct[i] == ",") pt += ct[i];
      else if (ct[i] == ct[i].toUpperCase()) {
        let ch = String.fromCharCode(
          ((ct.charCodeAt(i) + (26 - shift) - 65) % 26) + 65
        );
        pt += ch;
      } else {
        let ch = String.fromCharCode(
          ((ct.charCodeAt(i) + (26 - shift) - 97) % 26) + 97
        );
        pt += ch;
      }
    }

    let score = getTotalScore(pt);
    // logs += `key=${shift} => score=${score} : ${pt}\n`;
    if (score > bestScore) {
      bestScore = score;
      result = pt;
    }
  }

  return result;
}

/* 
  Ý tưởng:
   B1: Tạo ra 26 bản decrypt từ ciphertext đầu vào
   B2: Tìm những tổ hợp phụ âm, nguyên âm, ... của tiếng việt trong từng bản decrypt
   B3: Tính điểm (dựa trên độ dài của tổ hợp tìm được) cho từng bản decrypt
   B4: Lấy bản decrypt có số điểm cao nhất.
   */

// https://mltav.asn.au/vietnamese/images/documents/Van/wa-van.pdf
const phuam = "ch,gh,kh,ng,ngh,nh,ph,th,tr,gi,qu";
const banNguyenAm = "oa,oe,uy,ue";
const nguyenAm = "a,e,i,o,u,y";
const vanDonGian =
  "ic,ich,im,in,inh,ip,it,uc,un,ung,ut,um,up,ech,em,en,enh,ep,et,om,on,op,ot,ac,am,an,ang,ap,at,oc,ong,ec,eng,ach,anh";
const vanHoaAm = "eo,ao,ai,oi,eu,ia,iu,ui,uu,ua";
const vanHopAmLoai1 = "ay,au";
const vanHopAmLoai2 =
  "oac,oam,oan,oat,oang,uan,uat,uang,ieu,iec,iem,ien,iep,iet,ieng,yeu,yem,yen,uoi,uoc,uom,,uon,uop,uot,uong";

function getTotalScore(s) {
  let totalScore = 0;
  let str = s.toLowerCase();
  totalScore += getScore(str, vanHopAmLoai2.split(","));
  totalScore += getScore(str, vanDonGian.split(","));
  totalScore += getScore(str, vanHopAmLoai1.split(","));
  totalScore += getScore(str, vanHoaAm.split(","));
  totalScore += getScore(str, banNguyenAm.split(","));
  totalScore += getScore(str, phuam.split(","));

  return totalScore;
}

function getScore(str, checker) {
  let score = 0;

  for (let s of checker) {
    if (str.indexOf(s) >= 0) {
      score += s.length;
    }
  }
  return score;
}

function decrypt() {
  let ciphertext = document.getElementById("inp-ciphertext").value;
  let result = decryptCaesarCipherVietnamese(ciphertext);
  document.getElementById("result").innerHTML = result;
}
