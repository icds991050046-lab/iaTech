protectPage()

async function loadDashboard() {
  const { data: metrics } = await supabase
    .from("ml_metrics")
    .select("*")

  if (!metrics || metrics.length === 0) return

  document.getElementById("models").innerText = metrics.length

  const avg =
    metrics.reduce((a, b) => a + b.accuracy, 0) / metrics.length

  document.getElementById("avg").innerText =
    Math.round(avg * 100) + "%"

  // GRÁFICO DE ACURÁCIA
  new Chart(chartAccuracy, {
    type: "bar",
    data: {
      labels: metrics.map(m => m.model),
      datasets: [{
        label: "Acurácia (%)",
        data: metrics.map(m => m.accuracy * 100)
      }]
    }
  })

  // GRÁFICO DE DISTRIBUIÇÃO
  new Chart(chartDistrib, {
    type: "doughnut",
    data: {
      labels: metrics.map(m => m.model),
      datasets: [{
        data: metrics.map(m => m.accuracy * 100)
      }]
    }
  })
}

loadDashboard()

async function logout() {
  await supabase.auth.signOut()
  window.location.href = "index.html"
}
