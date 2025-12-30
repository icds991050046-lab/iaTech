const SUPABASE_URL = "SUA_SUPABASE_URL"
const SUPABASE_ANON_KEY = "SUA_SUPABASE_ANON_KEY"

const supabase = supabaseJs.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
)

// LOGIN
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault()

  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  const msg = document.getElementById("msg")

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    msg.innerText = error.message
  } else {
    window.location.href = "dashboard.html"
  }
})

// PROTEÇÃO DE PÁGINA
async function protectPage() {
  const { data } = await supabase.auth.getSession()
  if (!data.session) {
    window.location.href = "index.html"
  }
}

// REDIRECIONA SE JÁ ESTIVER LOGADO
async function redirectIfLogged() {
  const { data } = await supabase.auth.getSession()
  if (data.session) {
    window.location.href = "dashboard.html"
  }
}

redirectIfLogged()
