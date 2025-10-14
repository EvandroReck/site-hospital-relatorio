/* ---------- UTILIDADES GLOBAIS ---------- */
function qs(sel){ return document.querySelector(sel) }
function qsa(sel){ return Array.from(document.querySelectorAll(sel)) }

/* ---------- GERENCIAMENTO DO PERFIL (index + meds) ---------- */
function saveUsuario(usuario){
  localStorage.setItem('usuario', JSON.stringify(usuario));
}
function getUsuario(){
  try{ return JSON.parse(localStorage.getItem('usuario')) } catch(e){ return null }
}
function preencherPerfilModal(){
  const u = getUsuario();
  if(!u) return;
  qsa('#perfil-nome, #perfil-numero, #perfil-cpf, #perfil-endereco, #perfil-estadoCivil').forEach(el=>{
    if(!el) return;
    if(el.id === 'perfil-nome') el.textContent = u.nome;
    if(el.id === 'perfil-numero') el.textContent = u.numero;
    if(el.id === 'perfil-cpf') el.textContent = u.cpf;
    if(el.id === 'perfil-endereco') el.textContent = u.endereco;
    if(el.id === 'perfil-estadoCivil') el.textContent = u.estadoCivil;
  });
}

/* ---------- REGISTRO/LOGIN (overlay) ---------- */
(function initRegistro(){
  const form = qs('#formulario');
  const overlay = qs('#form-overlay');
  if(!form || !overlay) return;

  // Se já tem usuário, fecha overlay automaticamente
  const usuarioSalvo = getUsuario();
  if(usuarioSalvo){
    overlay.style.display = 'none';
  } else {
    overlay.style.display = 'flex';
  }

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const usuario = {
      nome: qs('#nome').value.trim(),
      numero: qs('#numero').value.trim(),
      cpf: qs('#cpf').value.trim(),
      endereco: qs('#endereco').value.trim(),
      estadoCivil: qs('#estadoCivil').value
    };
    if(Object.values(usuario).some(v => v === '' )) {
      alert('Preencha todos os campos!');
      return;
    }
    saveUsuario(usuario);
    overlay.style.display = 'none';
    alert('Bem-vindo(a), '+usuario.nome+'!');
  });
})();

/* ---------- PERFIL: abrir / fechar / editar / logout ---------- */
(function initPerfil(){
  const perfilBtn = qs('#perfil-btn');
  const perfilModal = qs('#perfil-modal');
  const fecharPerfil = qs('#fechar-perfil');
  const editar = qs('#editar-perfil');
  const logout = qs('#logout');

  if(perfilBtn){
    perfilBtn.addEventListener('click', ()=>{
      const u = getUsuario();
      if(!u){
        alert('Nenhum perfil encontrado. Faça o cadastro para continuar.');
        const overlay = qs('#form-overlay');
        if(overlay) overlay.style.display = 'flex';
        return;
      }
      preencherPerfilModal();
      if(perfilModal) perfilModal.style.display = 'flex';
    });
  }
  if(fecharPerfil) fecharPerfil.addEventListener('click', ()=>{ qs('#perfil-modal').style.display='none' });
  if(editar) editar.addEventListener('click', ()=>{
    // Simples: abre overlay para novo cadastro (limpa dados)
    localStorage.removeItem('usuario');
    location.reload();
  });
  if(logout) logout.addEventListener('click', ()=>{
    localStorage.removeItem('usuario');
    alert('Você saiu da conta.');
    location.reload();
  });
})();

/* ---------- INDEX PAGE: pequenos ajustes visuais ---------- */
if(document.body.id === 'page-index'){
  // Ocultar overlay se já estiver logado
  const user = getUsuario();
  if(user) {
    const overlay = qs('#form-overlay');
    if(overlay) overlay.style.display = 'none';
    preencherPerfilModal();
  }
}

/* ---------- MEDICAMENTOS PAGE ---------- */
if(document.body.id === 'page-meds'){
  // 100 medicamentos (nomes comuns) com preço (simulado)
  const meds = [
    {name:"Paracetamol 500mg", price:3.50},
    {name:"Ibuprofeno 400mg", price:5.20},
    {name:"Amoxicilina 500mg", price:12.00},
    {name:"Azitromicina 500mg", price:18.00},
    {name:"Omeprazol 20mg", price:9.50},
    {name:"Metformina 500mg", price:14.00},
    {name:"Losartana 50mg", price:11.00},
    {name:"Atorvastatina 20mg", price:22.00},
    {name:"Simvastatina 20mg", price:10.00},
    {name:"Levotiroxina 50mcg", price:16.50},
    {name:"Ranitidina 150mg", price:8.00},
    {name:"Diclofenaco 50mg", price:6.00},
    {name:"Claritromicina 500mg", price:20.00},
    {name:"Captopril 25mg", price:9.00},
    {name:"Amlodipino 5mg", price:13.00},
    {name:"Prednisona 20mg", price:7.50},
    {name:"Enalapril 10mg", price:10.00},
    {name:"Losartana Potássica 100mg", price:17.00},
    {name:"Furosemida 40mg", price:6.80},
    {name:"Hidroclorotiazida 25mg", price:5.60},
    {name:"Cefalexina 500mg", price:15.00},
    {name:"Naproxeno 500mg", price:9.50},
    {name:"Lorazepam 1mg", price:8.50},
    {name:"Sertralina 50mg", price:25.00},
    {name:"Fluoxetina 20mg", price:18.00},
    {name:"Ondansetrona 4mg", price:7.00},
    {name:"Metronidazol 400mg", price:6.50},
    {name:"Nitrofurantoína 100mg", price:13.00},
    {name:"Cetirizina 10mg", price:6.00},
    {name:"Clopidogrel 75mg", price:28.00},
    {name:"Glimepirida 4mg", price:14.50},
    {name:"Insulina NPH 100UI/ml", price:45.00},
    {name:"Insulina Regular 100UI/ml", price:48.00},
    {name:"Escitalopram 10mg", price:26.00},
    {name:"Doxiciclina 100mg", price:21.00},
    {name:"Benzetacil 1.200.000 UI", price:32.00},
    {name:"Vitamina D 10.000 UI", price:19.00},
    {name:"Vitamina C 1.000mg", price:9.00},
    {name:"Rivaroxabana 20mg", price:120.00},
    {name:"Enoxaparina 40mg/0.4ml", price:75.00},
    {name:"Warfarina 5mg", price:14.00},
    {name:"Prednisolona 5mg", price:6.00},
    {name:"Clonazepam 0.5mg", price:12.00},
    {name:"Loratadina 10mg", price:6.50},
    {name:"Vitamina B12 (injeção)", price:22.00},
    {name:"Omeprazol 40mg", price:14.00},
    {name:"Pantoprazol 40mg", price:16.00},
    {name:"Dexametasona 4mg", price:9.00},
    {name:"Levofloxacino 500mg", price:30.00},
    {name:"Clindamicina 300mg", price:18.00},
    {name:"Aspirina 100mg", price:5.50},
    {name:"Salbutamol (bombinha)", price:30.00},
    {name:"Budesonida (inalador)", price:40.00},
    {name:"Bromoprida 10mg", price:8.50},
    {name:"Loratadina infantil", price:7.50},
    {name:"Paracetamol infantil", price:6.50},
    {name:"Suplemento Ferro 40mg", price:12.00},
    {name:"Spironolactona 25mg", price:9.50},
    {name:"Bisoprolol 5mg", price:20.00},
    {name:"Metoprolol 50mg", price:18.00},
    {name:"Atenolol 50mg", price:15.00},
    {name:"Gabapentina 300mg", price:28.00},
    {name:"Pregabalina 75mg", price:36.00},
    {name:"Tramadol 50mg", price:27.00},
    {name:"Codeína 30mg", price:24.00},
    {name:"Acetilcisteína 600mg", price:11.00},
    {name:"Omeprazol cápsula GASTRO", price:20.00},
    {name:"Salmeterol + Fluticasona", price:160.00},
    {name:"Tiotropio", price:140.00},
    {name:"Risperidona 2mg", price:22.00},
    {name:"Quetiapina 25mg", price:30.00},
    {name:"Haloperidol 5mg", price:12.00},
    {name:"Isotretinoína 20mg", price:48.00},
    {name:"Metotrexato 2.5mg", price:30.00},
    {name:"Allopurinol 100mg", price:15.00},
    {name:"Fenitoína 100mg", price:26.00},
    {name:"Propranolol 40mg", price:17.00},
    {name:"Tamsulosina 0.4mg", price:25.00},
    {name:"Finasterida 5mg", price:29.00},
    {name:"Sulfametoxazol + Trimetoprim", price:9.50},
    {name:"Naproxeno 250mg", price:8.00},
    {name:"Cloridrato de tramadol comprimido", price:26.00},
    {name:"Vitamina B complex", price:15.00},
    {name:"Meloxicam 15mg", price:22.00},
    {name:"Celecoxibe 200mg", price:75.00},
    {name:"Duloxetina 60mg", price:55.00},
    {name:"Ribavirina (genérico)", price:120.00},
    {name:"Sitagliptina 100mg", price:95.00},
    {name:"Linagliptina 5mg", price:82.00},
    {name:"Empagliflozina 10mg", price:130.00},
    {name:"Canagliflozina 100mg", price:140.00}
  ];

  // monta grades
  const medsGrid = qs('#meds-grid');
  if(!medsGrid) return;
  meds.forEach((m, idx) => {
    const card = document.createElement('div');
    card.className = 'meds-card';
    card.innerHTML = `
      <h4>${m.name}</h4>
      <div class="meta">
        <div class="price">R$ ${m.price.toFixed(2)}</div>
        <div>
          <button class="add-btn" data-idx="${idx}">+</button>
        </div>
      </div>
      <small class="muted">Genérico / Marca comum</small>
    `;
    medsGrid.appendChild(card);
  });

  // Gerenciar carrinho (localStorage)
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function saveCart(){ localStorage.setItem('cart', JSON.stringify(cart)); renderCart() }

  function addToCart(idx){
    const item = meds[idx];
    const found = cart.find(c=>c.name===item.name);
    if(found) found.qty += 1;
    else cart.push({name:item.name, price:item.price, qty:1});
    saveCart();
  }

  function removeFromCart(name){
    cart = cart.filter(i=>i.name !== name);
    saveCart();
  }

  function changeQty(name, delta){
    const it = cart.find(i=>i.name===name);
    if(!it) return;
    it.qty += delta;
    if(it.qty <= 0) removeFromCart(name);
    saveCart();
  }

  function renderCart(){
    const container = qs('#cart-items');
    container.innerHTML = '';
    let subtotal = 0;
    if(cart.length === 0){
      container.innerHTML = '<p class="muted">Carrinho vazio</p>';
    } else {
      cart.forEach(i=>{
        subtotal += i.price * i.qty;
        const el = document.createElement('div');
        el.className = 'cart-item';
        el.innerHTML = `
          <div>
            <div style="font-weight:700">${i.name}</div>
            <div class="muted">R$ ${i.price.toFixed(2)} x ${i.qty}</div>
          </div>
          <div class="qty">
            <button class="add-btn small" data-action="plus" data-name="${i.name}">+</button>
            <button class="remove-btn" data-action="minus" data-name="${i.name}">—</button>
          </div>
        `;
        container.appendChild(el);
      });
    }
    qs('#cart-subtotal').textContent = subtotal.toFixed(2);
  }

  // delegação de clique nos botões +
  medsGrid.addEventListener('click', (e)=>{
    const btn = e.target.closest('.add-btn');
    if(!btn) return;
    const idx = Number(btn.dataset.idx);
    addToCart(idx);
  });

  // delegação no cart para alterar qtd
  qs('#cart-items').addEventListener('click', (e)=>{
    const btn = e.target.closest('[data-action]');
    if(!btn) return;
    const name = btn.dataset.name;
    const action = btn.dataset.action;
    if(action === 'plus') changeQty(name, 1);
    if(action === 'minus') changeQty(name, -1);
  });

  renderCart();

  // Comprar -> modal
  const btnComprar = qs('#btn-comprar');
  const checkoutModal = qs('#checkout-modal');
  const fecharCheckout = qs('#fechar-checkout');
  const checkoutBody = qs('#checkout-body');
  const btnConfirmar = qs('#btn-confirmar');

  function showCheckout(){
    if(cart.length === 0){ alert('Carrinho vazio. Adicione itens antes de comprar.'); return; }
    // Detecta método de pagamento
    const method = qs('input[name="pay"]:checked').value;
    checkoutBody.innerHTML = '';
    if(method === 'pix'){
      // mostra QR code fictício (simples block)
      const wrapper = document.createElement('div');
      wrapper.className = 'checkout-qr';
      wrapper.innerHTML = `
        <div class="fake-qr" aria-hidden="true"></div>
        <p>Use esse QR Code fictício para pagar (simulado)</p>
        <p><strong>PIX 000201... (fictício)</strong></p>
      `;
      checkoutBody.appendChild(wrapper);
    } else {
      // mostra formulário simples de cartão (simulação)
      const form = document.createElement('div');
      form.className = 'card-form';
      form.innerHTML = `
        <label>Número do cartão</label>
        <input placeholder="0000 0000 0000 0000">
        <label>Validade</label>
        <input placeholder="MM/AA">
        <label>CVV</label>
        <input placeholder="123">
        <p class="muted">Simulação de pagamento com cartão — sem transação real.</p>
      `;
      checkoutBody.appendChild(form);
    }
    checkoutModal.style.display = 'flex';
  }

  if(btnComprar) btnComprar.addEventListener('click', showCheckout);
  if(fecharCheckout) fecharCheckout.addEventListener('click', ()=> checkoutModal.style.display = 'none');

  if(btnConfirmar) btnConfirmar.addEventListener('click', ()=>{
    // Finaliza compra simulada
    const subtotal = cart.reduce((s,i)=>s+i.price*i.qty,0);
    checkoutModal.style.display = 'none';
    cart = []; saveCart();
    alert('Pagamento simulado realizado. Total: R$ '+subtotal.toFixed(2)+'\nObrigado pela compra!');
  });

  // salvar carrinho sempre que mudar (iniciado antes)
  saveCart();
}
