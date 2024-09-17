import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function MascotasPorPersona() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:8000/personas').then(res => res.json()),
      fetch('http://localhost:8000/mascotas').then(res => res.json()),
    ]).then(([personas, mascotas]) => {
      console.log('Personas:', personas);
      console.log('Mascotas:', mascotas);
      
      // Crear un objeto para contar las mascotas por tutor_id
      const mascotasPorTutor = mascotas.reduce((acc, mascota) => {
        acc[mascota.tutor_id] = (acc[mascota.tutor_id] || 0) + 1;
        return acc;
      }, {});

      const labels = personas.map(persona => persona.nombre);
      const cantidadMascotas = personas.map(persona => mascotasPorTutor[persona.id] || 0);
      
      console.log('Labels:', labels);
      console.log('Cantidad de Mascotas:', cantidadMascotas);

      setChartData({
        labels,
        datasets: [{
          label: 'Cantidad de Mascotas',
          data: cantidadMascotas,
          backgroundColor: 'rgba(75,192,192,0.6)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
        }],
      });
      setLoading(false);
    }).catch(error => {
      console.error('Error fetching data:', error);
      setLoading(false);
    });
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Cantidad de Mascotas por Persona',
      },
    },
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div style={{ height: '400px', width: '100%' }}>
      {chartData && <Bar data={chartData} options={options} />}
    </div>
  );
}

export default MascotasPorPersona;