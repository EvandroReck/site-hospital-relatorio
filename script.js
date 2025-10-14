// ==================== LOGIN / FORMULÁRIO ====================
const loginOverlay = document.querySelector(".overlay");
const loginForm = document.querySelector("#login-form");
const siteContent = document.querySelector("#site-content");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.querySelector("#nome").value.trim();
    const numero = document.querySelector("#numero").value.trim();
    const cpf = document.querySelector("#cpf").value.trim();
    const endereco = document.querySelector("#endereco").value.trim();
    const estadoCivil = document.querySelector("#estado-civil").value;

    if (!nome || !numero || !cpf || !endereco || !estadoCivil) {
      alert("⚠️ Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    // Salva dados do usuário
    const userData = { nome, numero, cpf, endereco, estadoCivil };
    localStorage.setItem("usuario", JSON.stringify(userData));

    // Esconde o login e mostra o conteúdo
    loginOverlay.style.display = "none";
    if (siteContent) siteContent.style.display = "block";
  });
}

// ==================== PERFIL ====================
const profileBtn = document.querySelector("#profile-btn");
const profileModal = document.querySelector("#profile-modal");
const closeProfile = document.querySelector("#close-profile");

if (profileBtn && profileModal && closeProfile) {
  profileBtn.addEventListener("click", () => {
    const userData = JSON.parse(localStorage.getItem("usuario"));
    if (userData) {
      document.querySelector("#perfil-nome").innerText = userData.nome;
      document.querySelector("#perfil-cpf").innerText = userData.cpf;
      document.querySelector("#perfil-numero").innerText = userData.numero;
      document.querySelector("#perfil-endereco").innerText = userData.endereco;
      document.querySelector("#perfil-estado").innerText = userData.estadoCivil;
    }
    profileModal.style.display = "flex";
  });

  closeProfile.addEventListener("click", () => {
    profileModal.style.display = "none";
  });
}

// ==================== BOTÃO MEDICAMENTOS ====================
const medsButton = document.querySelector("#meds-link");
if (medsButton) {
  medsButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "medicamentos.html";
  });
}

// ==================== PÁGINA DE MEDICAMENTOS ====================
const cart = [];
const medsList = document.querySelector("#meds-list");
const cartContainer = document.querySelector("#cart-items");
const totalValue = document.querySelector("#total-value");
const buyBtn = document.querySelector("#buy-btn");
const paymentModal = document.querySelector("#payment-modal");
const closePayment = document.querySelector("#close-payment");

if (medsList) {
  // Gerar medicamentos automaticamente (100 itens)
  const medicamentos = [];
  for (let i = 1; i <= 100; i++) {
    medicamentos.push({
      nome: `Medicamento ${i}`,
      preco: (Math.random() * 80 + 10).toFixed(2)
    });
  }

  medicamentos.forEach((med) => {
    const card = document.createElement("div");
    card.classList.add("meds-card");
    card.innerHTML = `
      <h4>${med.nome}</h4>
      <div class="meta">
        <span class="price">R$ ${med.preco}</span>
        <button class="add-btn">+</button>
      </div>
    `;
    medsList.appendChild(card);

    card.querySelector(".add-btn").addEventListener("click", () => {
      addToCart(med);
    });
  });
}

// ==================== FUNÇÕES DO CARRINHO ====================
function addToCart(med) {
  const existing = cart.find((item) => item.nome === med.nome);
  if (existing) {
    existing.qtd += 1;
  } else {
    cart.push({ ...med, qtd: 1 });
  }
  renderCart();
}

function renderCart() {
  if (!cartContainer) return;
  cartContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <span>${item.nome} (x${item.qtd})</span>
      <span>R$ ${(item.preco * item.qtd).toFixed(2)}</span>
      <button class="remove-btn" data-index="${index}">🗑️</button>
    `;
    total += item.preco * item.qtd;
    cartContainer.appendChild(div);
  });

  if (totalValue) totalValue.textContent = total.toFixed(2);

  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const idx = e.target.getAttribute("data-index");
      cart.splice(idx, 1);
      renderCart();
    });
  });
}

// ==================== PAGAMENTO / POPUP QR CODE ====================
if (buyBtn && paymentModal) {
  buyBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("🛒 Seu carrinho está vazio!");
      return;
    }
    paymentModal.style.display = "flex";
  });
}

if (closePayment) {
  closePayment.addEventListener("click", () => {
    paymentModal.style.display = "none";
  });
}
