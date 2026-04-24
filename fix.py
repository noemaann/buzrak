import sys
import re

with open(r'd:\Git\buzrak\fr.js', 'r', encoding='utf-8') as f:
    content = f.read()

# We know the file has '    }\n  };\n' around line 196
parts = re.split(r'  \};\s+const y = e\.clientY', content)

if len(parts) == 2:
    part1 = parts[0] + '  };\n'
    part2 = '      const y = e.clientY' + parts[1]
    
    missing = """
  const committeeId = urlParams.get('id');
  if (committeeId && committeeDict[committeeId]) {
    const data = committeeDict[committeeId];
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
    set('cName', data.name);
    set('cPeriod', data.period);
    set('cAchievements', data.achievements);
    set('cDisadvantages', data.disadvantages);
    set('cFallReason', data.fallReason);
    
    const cMembers = document.getElementById("cMembers");
    if (cMembers) {
      cMembers.innerHTML = "";
      const allMates = ["Jasim","Sanjay","Goutham D","Levin","Shinil","Althaf","Aashir","Noeman","Reyyan","Roshan","Nishal","Shibil","Arshad","Nithash","PP","Farseen","Aravind","Huzail","Adhin","Alan","Josekutty","Abhinav","Anuchind","Hrishi","Vaseem","Shabeel","Rasl","Adith","Shaz","Hamdan","Shon","Shemil","Amjad","Shahanad","Nihal","Geo","Sangeeth","Naseef","Anandhu","Sreedin","Faheem","Jayanth","Vaishnav","Sabith","Drupad","Goutham K","Akbar","Alphons","Shaheen","Yacoob","Aman","Adnan","Basim"];
      data.members.forEach(m => {
        let baseName = m.replace(" (Secretary)", "");
        let index = allMates.findIndex(name => name.toLowerCase() === baseName.toLowerCase());
        
        if (index !== -1) {
          const i = index + 1;
          const a = document.createElement("a");
          a.className = "mate-card reveal visible";
          a.href = `member.html?id=${i}&name=${encodeURIComponent(allMates[index])}`;
          const imgSrc = encodeURI(`DP's/${allMates[index]}.jpg`);
          a.innerHTML = `
            <img class="mate-photo" src="${imgSrc}" alt="${allMates[index]}" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(allMates[index])}&background=1a3a28&color=f7f4ed&size=80'">
            <div class="mate-name">${m}</div>
          `;
          cMembers.appendChild(a);
        } else {
          const div = document.createElement("div");
          div.className = "mate-card reveal visible";
          div.innerHTML = `<div class="mate-name" style="padding: 20px;">${m}</div>`;
          cMembers.appendChild(div);
        }
      });
    }
  }

  /* ─── ENHANCED 3D STATS & SCRAMBLE COUNTER ──────── */
  document.querySelectorAll('.stat-item').forEach(card => {
    
    let isRevealed = false;
    
    // Magnetic 3D Tilt Hover
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
"""
    
    with open(r'd:\Git\buzrak\fr.js', 'w', encoding='utf-8') as f:
        f.write(part1 + missing + part2)
    print("Fixed fr.js")
else:
    print("Could not split content. Parts length:", len(parts))
