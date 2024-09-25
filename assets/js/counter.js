// Lógica referente ao cronômetro

//Definição das variáveis 
let selectedTimer = 'pomodoro';
let timerDuration = 25 * 60; 
let interval;
const timerParagraph = document.querySelector('#counter');
const tasksList = document.querySelector('#tasks');
const addTaskButton = document.querySelector('#add-task');
const newTaskInput = document.querySelector('#new-task');
let pomodoroCount = 0;
let isPaused = false;

// Seleciona o som que será reproduzido ao finalizar o timer
const endSound = document.getElementById('end-sound');

// Atualiza o estilo do botão ativo e define a duração do temporizador com base no modo selecionado.
function changeSelectClasses(timer) {
    const buttons = document.querySelectorAll('.modality');
    buttons.forEach(button => button.classList.remove('active-button'));
    
    if (timer === 'pomodoro') {
        document.querySelector('#pomodoro').classList.add('active-button');
        timerDuration = 25 * 60; // 25 minutos
    } else if (timer === 'short-break') {
        document.querySelector('#short-break').classList.add('active-button');
        timerDuration = 5 * 60; // 5 minutos
    } else if (timer === 'long-break') {
        document.querySelector('#long-break').classList.add('active-button');
        timerDuration = 30 * 60; // 30 minutos
    }
    resetTimer();
}

// Seleciona o modo do temporizador 
function selectTimer(timer) {
    selectedTimer = timer;
    changeSelectClasses(timer);
}

// Reinicia o temporizador, limpando o intervalo 
function resetTimer() {
    clearInterval(interval);
    isPaused = false; 

    //  Define a duração do temporizador com base no modo selecionado.
    if (selectedTimer === 'pomodoro') {
        timerDuration = 25 * 60; 
    } else if (selectedTimer === 'short-break') {
        timerDuration = 5 * 60; 
    } else if (selectedTimer === 'long-break') {
        timerDuration = 30 * 60;
    }

    updateTimerDisplay();
}

// Inicia o temporizador, atualizando o tempo a cada segundo.
function startTimer() {
    if (isPaused) {
        isPaused = false; // Reinicia o estado de pausa
    } else {
        clearInterval(interval); // Garante que não haja múltiplos intervalos
    }
    
// Inicia um intervalo que atualiza o tempo a cada segundo (a cada 1seg)
    interval = setInterval(() => {
        if (timerDuration <= 0) {
            clearInterval(interval);
            pomodoroCount++;   // Incrementa o contador de pomodoros
            endSound.play();  // Toca o som quando o timer termina
            
            // Adiciona um atraso para o alerta
            setTimeout(() => {
                alert("Tempo esgotado!");
            }, 100); 
            
            document.title = `Pomodoro Timer - ${pomodoroCount} Pomodoros`;
            return;
        }
        timerDuration--;
        updateTimerDisplay();
    }, 1000);
}

// Atualiza a exibição do temporizador no formato seg - min
function updateTimerDisplay() {
    let minutes = Math.floor(timerDuration / 60);
    let seconds = timerDuration % 60;
    timerParagraph.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    // Atualiza o título com a contagem regressiva
    document.title = `Pomodoro Timer - ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} - ${pomodoroCount} Pomodoros`;
}

// Inicializa o temporizador e carrega as tarefas ao carregar a página.
resetTimer();
loadTasks();

// Event listeners para ações do usuário.
addTaskButton.addEventListener('click', addTask);
document.querySelector('#restart').addEventListener('click', resetTimer);
document.querySelector('#start').addEventListener('click', startTimer);
document.querySelector('#pause').addEventListener('click', () => {
    isPaused = true; 
    clearInterval(interval); 
});
