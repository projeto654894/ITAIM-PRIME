

document.addEventListener("DOMContentLoaded", () => {

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".main-nav");
  if (burger && nav) {
    burger.addEventListener("click", () => {
      nav.classList.toggle("open");
      burger.classList.toggle("active");
      document.body.classList.toggle("no-scroll");
    });
  }


  const header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 30);
    });
  }


  const productGrid = document.getElementById("productGrid");
  const WHATSAPP_NUMBER = "5581973207562"; 

  if (productGrid) {
    productGrid.addEventListener("click", (e) => {
      const button = e.target.closest(".add-to-cart");
      if (!button) return;

      const card = button.closest(".card");
      if (!card) return;

      const productName = card.querySelector("h3")?.textContent?.trim() || "Produto";
      const message = `Olá! Gostaria de comprar o produto: ${productName}`;
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

      window.open(url, "_blank", "noopener,noreferrer");
    });
  }

  const track = document.querySelector(".carousel-track");
  const dotsNav = document.querySelector(".carousel-dots");
  const nextBtn = document.querySelector(".carousel .next");
  const prevBtn = document.querySelector(".carousel .prev");

  if (track && dotsNav && nextBtn && prevBtn) {
    const slides = Array.from(track.children);
    let current = 0;

   
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      dotsNav.appendChild(dot);
    });

    const dots = Array.from(dotsNav.children);

    const updateCarousel = (index) => {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle("active", i === index));
    };

    nextBtn.addEventListener("click", () => {
      current = (current + 1) % slides.length;
      updateCarousel(current);
    });

    prevBtn.addEventListener("click", () => {
      current = (current - 1 + slides.length) % slides.length;
      updateCarousel(current);
    });

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        current = index;
        updateCarousel(current);
      });
    });

    setInterval(() => {
      current = (current + 1) % slides.length;
      updateCarousel(current);
    }, 5000);
  }

 
  const chatMessages = document.getElementById("chatMessages");
  const chatInput = document.getElementById("chatInput");

  if (chatMessages && chatInput) {
   
    addBotMessage("👋 Olá! Seja bem-vindo à Itaim Prime! Como posso te ajudar hoje?");

    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendMessage();
    });

    function sendMessage() {
      const userMessage = chatInput.value.trim();
      if (!userMessage) return;

      addUserMessage(userMessage);
      chatInput.value = "";

      setTimeout(() => {
        const botResponse = getBotResponse(userMessage);
        addBotMessage(botResponse);
      }, 700);
    }

    function addUserMessage(msg) {
      const div = document.createElement("div");
      div.className = "chat-message user-message";
      div.textContent = msg;
      chatMessages.appendChild(div);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addBotMessage(msg) {
      const div = document.createElement("div");
      div.className = "chat-message bot-message";
      div.textContent = msg;
      chatMessages.appendChild(div);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getBotResponse(msg) {
      const lower = msg.toLowerCase();
      if (lower.includes("horário") || lower.includes("funciona")) {
        return "🕒 Nosso horário de funcionamento é das 8h às 20h, de segunda a sábado!";
      } else if (lower.includes("endereço") || lower.includes("onde")) {
        return "📍 Estamos localizados em Itaim — São Paulo. Envie 'localização' para receber o mapa!";
      } else if (lower.includes("preço") || lower.includes("valor")) {
        return "💸 Os preços variam conforme o produto. Quer que eu te envie o catálogo completo?";
      } else if (lower.includes("whatsapp") || lower.includes("contato") || lower.includes("telefone")) {
        return `📞 Você pode falar conosco diretamente pelo WhatsApp: (${WHATSAPP_NUMBER.slice(2,4)}) ${WHATSAPP_NUMBER.slice(4,9)}-${WHATSAPP_NUMBER.slice(9)}`;
      } else {
        return `🤖 Para falar com um atendente, envie mensagem no WhatsApp: (${WHATSAPP_NUMBER.slice(2,4)}) ${WHATSAPP_NUMBER.slice(4,9)}-${WHATSAPP_NUMBER.slice(9)}`;
      }
    }
  }


  const whatsappFloat = document.querySelector(".whatsapp-float");
  if (whatsappFloat) {
    whatsappFloat.addEventListener("mouseenter", () => {
      whatsappFloat.style.transform = "scale(1.1)";
    });
    whatsappFloat.addEventListener("mouseleave", () => {
      whatsappFloat.style.transform = "scale(1)";
    });
  }
});

