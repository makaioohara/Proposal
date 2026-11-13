      // ✏️ EDIT YOUR TEXT HERE
      const CONFIG = {
        likes: [
          [
            "Comfort, care & ease",
            "I love that we can be ourselves around each other and feel cared for, relaxed, and safe.",
          ],
          [
            "Our calm together",
            "Even when the day feels heavy, we know how to help each other feel calm and at ease.",
          ],
          [
            "The way we grow",
            "There's so much positivity between us. We've learned to listen, adapt, and make room for each other while still being ourselves.",
          ],
          [
            "Your smile",
            "It brightens the moment and always gives me one more thing to look forward to.",
          ],
          [
            "Your presence",
            "Just having you around can make an ordinary moment feel special.",
          ],
        ],
        yesText: "I promise to make you smile, now and forever.",
      };

      const $ = (id) => document.getElementById(id);

      /* ---- background: soft stars, rare shooting stars, drifting dust ---- */
      const cv = $("bg"),
        cx = cv.getContext("2d");
      let W,
        H,
        stars = [],
        dust = [],
        shoots = [];
      function size() {
        const d = window.devicePixelRatio || 1;
        cv.width = innerWidth * d;
        cv.height = innerHeight * d;
        cx.setTransform(d, 0, 0, d, 0, 0);
        W = innerWidth;
        H = innerHeight;
      }
      size();
      addEventListener("resize", size);
      const starTones = ["#fff8e8", "#d9f8ff", "#d9d5ff", "#ffd9eb"];
      for (let i = 0; i < 170; i++)
        stars.push({
          x: Math.random(),
          y: Math.random(),
          r: Math.random() * 0.65 + 0.25,
          p: Math.random() * 6,
          s: 0.004 + Math.random() * 0.014,
          tone: starTones[Math.floor(Math.random() * starTones.length)],
          phase: Math.random() * Math.PI * 2,
        });
      for (let i = 0; i < 16; i++)
        dust.push({
          x: Math.random(),
          y: Math.random(),
          r: 0.5 + Math.random() * 0.6,
          v: 0.00008 + Math.random() * 0.00018,
          p: Math.random() * 6,
        });
      function frame() {
        cx.clearRect(0, 0, W, H);
        stars.forEach((s) => {
          s.p += s.s;
          const twinkle = 0.3 + 0.4 * (0.5 + 0.5 * Math.sin(s.p + s.phase));
          const x = s.x * W;
          const y = s.y * H;
          cx.globalAlpha = twinkle;
          cx.fillStyle = s.tone;
          cx.beginPath();
          cx.arc(x, y, s.r, 0, Math.PI * 2);
          cx.fill();
        });
        dust.forEach((f) => {
          f.p += 0.006;
          f.y -= f.v;
          f.x += Math.sin(f.p) * 0.0002;
          if (f.y < -0.05) {
            f.y = 1.05;
            f.x = Math.random();
          }
          const g = cx.createRadialGradient(
            f.x * W,
            f.y * H,
            0,
            f.x * W,
            f.y * H,
            f.r * 3,
          );
          g.addColorStop(0, "rgba(195,225,240,.3)");
          g.addColorStop(1, "rgba(195,225,240,0)");
          cx.globalAlpha = 0.08 + 0.08 * Math.sin(f.p * 2);
          cx.fillStyle = g;
          cx.beginPath();
          cx.arc(f.x * W, f.y * H, f.r * 3, 0, Math.PI * 2);
          cx.fill();
        });
        if (Math.random() < 0.003)
          shoots.push({
            x: Math.random() * W * 0.7,
            y: Math.random() * H * 0.35,
            l: 0,
          });
        shoots = shoots.filter((s) => s.l < 45);
        shoots.forEach((s) => {
          s.l++;
          s.x += 13;
          s.y += 6;
          const g = cx.createLinearGradient(s.x, s.y, s.x - 110, s.y - 50);
          g.addColorStop(0, "rgba(255,255,255,.9)");
          g.addColorStop(1, "rgba(255,255,255,0)");
          cx.globalAlpha = 1 - s.l / 55;
          cx.strokeStyle = g;
          cx.lineWidth = 1.6;
          cx.beginPath();
          cx.moveTo(s.x, s.y);
          cx.lineTo(s.x - 110, s.y - 50);
          cx.stroke();
        });
        requestAnimationFrame(frame);
      }
      frame();

      /* ---- content ---- */
      CONFIG.likes.forEach(([t, d], i) => {
        const li = document.createElement("li");
        li.style.animationDelay = 0.5 + i * 0.15 + "s";
        li.innerHTML =
          '<button class="q"><b></b><span></span><i></i></button><div class="d"></div>';
        li.querySelector("b").textContent = "0" + (i + 1);
        li.querySelector("span").textContent = t;
        li.querySelector(".d").textContent = d;
        li.querySelector(".q").onclick = () => {
          const wasOpen = li.classList.contains("open");
          $("likes").querySelectorAll(".open").forEach((openItem) => {
            openItem.classList.remove("open");
          });
          if (!wasOpen) li.classList.add("open");
        };
        $("likes").appendChild(li);
      });
      $("yesText").textContent = CONFIG.yesText;

      function go(id) {
        document
          .querySelectorAll(".page")
          .forEach((p) => p.classList.remove("show"));
        const el = $(id);
        el.classList.add("show");
        el.scrollTop = 0;
      }
      go("p-moon");

      /* ---- final page ---- */
      const noLines = [
        "That big button is a decoy…",
        "Look closer. There’s a tiny one.",
        "Ouch. That one stung a little.",
        "The tiny button is getting braver…",
        "It’s practically waving at you now.",
        "Last chance to be reasonable.",
      ];
      let n = 0;
      const yes = $("yes"),
        no = $("no");
      function burst(x, y, count) {
        for (let i = 0; i < count; i++) {
          const h = document.createElement("div");
          h.className = "fx";
          h.textContent = "♥";
          h.style.left = x + "px";
          h.style.top = y + "px";
          h.style.fontSize = 14 + Math.random() * 22 + "px";
          h.style.setProperty("--x", (Math.random() - 0.5) * 300 + "px");
          h.style.animationDuration = 2.5 + Math.random() * 3 + "s";
          document.body.appendChild(h);
          setTimeout(() => h.remove(), 6000);
        }
      }
      no.onclick = () => {
        if (n >= noLines.length) {
          go("p-thanks");
          return;
        }
        n++;
        $("msg").textContent = noLines[Math.min(n - 1, noLines.length - 1)];
        $("fb").style.animation = "shake .35s";
        setTimeout(() => ($("fb").style.animation = ""), 400);
        no.style.fontSize = Math.max(0.75, 1 - n * 0.05) + "rem";
        no.style.padding =
          Math.max(9, 12 - n * 0.5) +
          "px " +
          Math.max(16, 24 - n * 1.3) +
          "px";
        yes.className = n >= 5 ? "lv3" : n >= 3 ? "lv2" : "lv1";
      };
      yes.onclick = () => {
        go("p-yes");
        for (let i = 0; i < 40; i++)
          setTimeout(
            () => burst(Math.random() * innerWidth, innerHeight, 2),
            i * 130,
          );
      };
    
