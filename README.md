# README.md — Dicionário de Contrabando

## 1. Descrição do Artefacto
O **Dicionário de Contrabando** constitui um artefacto multimédia de subversão antropológica e resistência semântica, integrado no laboratório digital de `paulolopes.org`. Concebido como um repositório de contra-estratégias lexicais, este dicionário confronta a linguagem oficial e tecnocrática com a dureza, a poesia e o desvio prático do quotidiano — cruzando a experiência da cozinha de luxo e da vida insular em Porto Santo com a arqueologia do presente.

Cada verbete estrutura-se rigorosamente em três corpos:
1. **O Sentido Oficial:** A definição canónica e institucional fixada pela lexicografia.
2. **O Sentido de Contrabando:** A mutação funcional e a apropriação subversiva operada pelos sujeitos no terreno.
3. **O Grão de Campo:** A transcrição crua da observação etnográfica ou antropológica que serve de raiz empírica ao verbete.

---

## 2. Arquitetura e Funcionamento da Aplicação
O dicionário opera sob uma arquitetura leve do tipo *flat-file*, eliminando a dependência de bases de dados relacionais complexas (como MySQL) e garantindo portabilidade, durabilidade e independência face às instâncias WordPress do ecossistema.

### Estrutura de Diretórios no Servidor (Hostinger)
```text
/public_html/
└── laboratorio/
    └── dicionario/
        ├── index.html       # Interface visual principal (Navegador A–Z)
        ├── app.js           # Motor assíncrono em Vanilla JS (lê e processa os .md)
        ├── manifest.json    # Registo automatizado dos verbetes existentes
        ├── style.css        # Folha de estilos tipográfica e minimalista
        ├── README.md        # Manual técnico de operação e arquitetura
        └── verbetes/        # Pasta de arquivo (um ficheiro .md por palavra)
            ├── contrabandear.md
            ├── lavatorio.md
            └── oficio.md
