# language: pt
@progresso
Funcionalidade: Acompanhar progresso de curso na Iterasys
  Como um aluno autenticado e matriculado em um curso
  Quero acompanhar o progresso das aulas
  Para continuar meus estudos de onde parei

  Esquema do Cenário: Manter o progresso da aula ao acessá-la novamente
    Dado que o usuário esteja na página de cursos
    Quando o usuário acessar o curso "<curso>" pela opção "<forma_acesso>"
    Então o título do curso "<titulo_curso>" deve ser exibido
    Quando o usuário abrir a aula "<aula>" para verificar o progresso
    E o usuário iniciar o conteúdo da aula
    Então o player da aula deve carregar corretamente
    E o progresso da aula deve ser "<progresso>"
    Quando o usuário voltar da aula pelo navegador
    Então o título do curso "<titulo_curso>" deve ser exibido
    Quando o usuário retornar ao catálogo e acessar novamente o curso "<curso>" pela opção "<forma_acesso>"
    Então o título do curso "<titulo_curso>" deve ser exibido
    Quando o usuário abrir a aula "<aula>" para verificar o progresso
    Então o progresso da aula deve continuar em "<progresso>"

    Exemplos:
      | curso                                     | forma_acesso  | titulo_curso                              | aula                                  | progresso |
      | Formação em Teste e QA com IA - Turma 148 | catálogo      | Formação em Teste e QA - Turma 148        | Dúvida: Como aplicar em um 1º projeto | 58 %      |
      | Formação em Teste de Software - Turma 142 | carregar mais | Formação em Teste de Software - Turma 142 | Configurações e Selenium IDE          | 25 %      |
