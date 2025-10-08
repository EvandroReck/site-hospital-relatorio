// --- Cadastro obrigatório ---
const form = document.getElementById("formulario");
const overlay = document.getElementById("form-overlay");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const numero = document.getElementById("numero").value;
  const cpf = document.getElementById("cpf").value;
  const endereco = document.getElementById("endereco").value;
  const estadoCivil = document.getElementById("estadoCivil").value;

  if (!nome || !numero || !cpf || !endereco || !estadoCivil) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  // Salva os dados do perfil no localStorage
  const usuario = { nome, numero, cpf, endereco, estadoCivil };
  localStorage.setItem("usuario", JSON.stringify(usuario));

  overlay.style.display = "none";
  alert("Bem-vindo(a), " + nome + "!");
});

// --- Modal do perfil ---
const perfilBtn = document.getElementById("perfil-btn");
const perfilModal = document.getElementById("perfil-modal");
const fecharPerfil = document.getElementById("fechar-perfil");

perfilBtn.addEventListener("click", () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (usuario) {
    document.getElementById("perfil-nome").textContent = usuario.nome;
    document.getElementById("perfil-numero").textContent = usuario.numero;
    document.getElementById("perfil-cpf").textContent = usuario.cpf;
    document.getElementById("perfil-endereco").textContent = usuario.endereco;
    document.getElementById("perfil-estadoCivil").textContent = usuario.estadoCivil;

    perfilModal.style.display = "flex";
  } else {
    alert("Nenhum perfil encontrado. Faça o cadastro novamente.");
    overlay.style.display = "flex";
  }
});

fecharPerfil.addEventListener("click", () => {
  perfilModal.style.display = "none";
});
