# language: pt
@aula
Funcionalidade: Reproduzir aulas na Iterasys
  Como um aluno logado na plataforma
  Quero reproduzir aulas dos meus cursos
  Para acessar o conteúdo de aprendizagem

  Esquema do Cenário: Reproduzir uma aula de diferentes cursos
    Dado que o usuário esteja na página de cursos
    Quando o usuário carregar mais cursos
    Então o curso "<curso>" deve estar disponível
    Quando o usuário iniciar ou continuar o curso pela opção <indice_continuar>
    Então o título do curso "<titulo_curso>" deve ser exibido
    E o módulo "<modulo>" e a aula "<aula>" devem estar disponíveis
    Quando o usuário abrir a aula "<aula>"
    Então o player da aula deve carregar corretamente
    E o usuário iniciar a reprodução da aula
    Então a aula deve estar em reprodução
    Quando o usuário pausar a aula
    Então a aula deve estar pausada
    Quando o usuário retomar a aula
    Então a aula deve estar em reprodução
    E o player deve permitir avançar e recuar quando disponível
    Quando o usuário recarregar a página da aula
    Então o player da aula deve carregar corretamente
    Quando o usuário iniciar a reprodução da aula
    Então a aula deve estar em reprodução

    Exemplos:
      | curso                                     | indice_continuar | titulo_curso                              | modulo                 | aula                         |
      | Formação em Teste de Software - Turma 142 | 3                | Formação em Teste de Software - Turma 142 | Planejamento e Análise | Configurações e Selenium IDE |
      | Formação em Teste e QA com IA - Turma 148 | 0                | Formação em Teste e QA - Turma 148        | Conceitos Fundamentais | Aula Inaugural               |
