## Arquitetura

O projeto utiliza em sua grande parte uma arquitetura inspirada KISS — keep it simple stupid e por força deste destino, a estrutura básica do projeto se tornando a seguinte:

```
projeto
└── src/
    ├── assets/
    ├── components/
        ├── InputText/
        ├── Button/
    ├── features/ (fluxos)
        ├── dashboard/
        ├── auth/
            ├── assets/
            ├── components/
            ├── hooks/
            ├── helpers/
            ├── services/
            ├── screens/ (lógica de tela)
                ├── list/
                    ├── ui/ (componentes de tela)
                        ├── index.tsx
                        ├── styles.ts
                    ├── index.tsx
            ├── types/
            ├── model/
            ├── navigation.tsx
    ├── services/
    ├── helpers/
    ├── navigation/
    ├── store/
    ├── styles/
    └── utils/
```

Ps.: Apesar de haver um diretório `store` listado acima, talvez 90% da arquitetura
do app NÃO é Redux de fato. Além de que, existem várias ressalvas à serem feitas
antes de utilizá-lo no projeto.

Ps 2.: Esta não é a árvore completa e sim apenas um resumo dos diretórios
mais importantes.

### Sumário

- [Components](#components)
- [Containers](#containers)
- [Screens](#screens)
- [Services](#services)
- [Navigation](#navigation)
- [Redux](#redux)

### Components

Por padrão, componentes sem estado e que representam apenas "pedaços" de funcionalidade
da UI, como labels, inputs, loading indicators e afins vão em `src/components/`.

Ademais, todo componente em `src/components/`, sem exceção, deve ser um stateless
component. Ou seja, toda a informação necessária para exibí-lo deve ser passado
via `props`, incluindo funções (no caso de resposta à eventos de UI, como gestures por exemplo),
e nenhum estado interno deve jamais ser criado.

No mais, tais componentes são por muitas vezes reutilizáveis em vários fluxos
ou telas e costumam ser bem genéricos.

#### Componentes não reutilizáveis

Às vezes, por questões de manutenabilidade, componentes complexos são divididos
em stateless components menores, porém que servirão APENAS para aquele fluxo(features).

Nesses casos, o ideal é que tais sejam criados JUNTOS ao container pai
na pasta `components` relativa ao mesmo, ex.: `src/features/MyFeature/components`.

### Containers

Containers são componentes resultantes da composição de vários stateless components e,
normalmente, contêm toda a UI de uma tela e seus estilos.

Além disso, nenhum container jamais deve conter lógica relacionada à regra de
negócios, apenas UI. ex.: `src/features/MyFeature/screens/product/ui`.

No mais, containers podem ter estado interno (embora deva ser evitado), desde
que o mesmo seja relacionado exclusivamente à UI.

#### Estilo

Por padrão, todos os estilos de um container, bem como suas regras de layout,
devem ficar no arquivo `styles.ts` relativo ao diretório do container.

Ex.: `src/features/MyFeature/screens/product/ui/styles.ts` são os estilos para o
container `ProductContainer`.

### Screens

Screens são stateful components que mantêm estado de telas, lidam com
regras de negócios, navegação e realizam side-effects (API requests, storage,
file system access etc.).

Normalmente utilizam apenas um container, porém, em casos onde a screen pode ter
diferentes estados (como no caso de erros, por exemplo), é permissível, e até
recomendável, que se crie um container para cada estado.

Por fim, é recomendável que a screen seja capaz de tratar TODOS os casos de erro
possíveis da tela a qual a mesma está relacionada.

#### Navegação

Toda screen, sem exceção, recebe uma `prop` chamada `location` | `history` | `params` através de hooks
exporto `react-router-dom`, que além de tudo, é por onde a screen recebe parâmetros de outras screens
e propaga dados para o restante do fluxo.

E apesar de `ContextApi` ser uma prática muito comum para propagar
dados dentro e entre fluxos o mesmo deve mais ser utilizado.

Para propagar dados entre screens utilize navigation props ou `ContextApi`
Caso seja um fluxo muito grande, como, por exemplo um formulário partido em várias
screens, e nem todo o estado precise estar no redux por não ser global

### Services

Services são normalmente um conjunto de funções ligadas à um mesmo contexto,
mas que não estão diretamente relacionadas à UI ou React, normalmente networking.

Geralmente são apenas meras abstrações sobre rotas de API ou de coisas relacionadas à
networking no geral.

#### `/services`

Contem os services relacionados à API da pagar.me apenas.

Obs.: Atualmente estamos trabalhando para remover os services pagar.me completamente.
Então, idealmente, nenhum novo pagar.me service deve ser criado a não ser que
estritamente necessário.

### Navigation

Hoje nós utilizamos uma biblioteca chamada `react-router-dom` para navegação entre
screens.

Portanto, para tentar facilitar a manutenabilidade da navegação, nós unimos todas
em um único diretório chamado `src/navigation`. Após cada `feature`, ter um arquivo de navegação `src/features/MyFeature/navigation.tsx`.

### Redux e Redux Saga

Existem certos tipos de dados que precisam ser compartilhados entre muitos
fluxos, como por exemplo dados de usuário ou pdv. E foi pensando
nesses casos mais específicos que implementamos Redux. Portanto, caso não haja
necessidade de sincronizar estado em lugares diferentes da aplicação, Redux
não será desejado.

#### Casos de uso

Hoje, apesar de termos várias entidades no store do redux, é consentimento que devemos focar no uso de dados globais
(dados compartilhados entre telas/navigators diferentes, no nosso caso) pelo redux - sendo que os dados que
respondem a essas característica são: transações e dados do usuário/ou outro fluxo.

### Boas práticas

Atente-se para as seguintes boas práticas:

- Remova códigos comentados;
- Remova console.log;
- Adicione TODOS para melhorias futuras;
- Não adicione libs desnecessárias (alinhe com o time antes de adicionar uma nova lib);
- Não utilize `any` (exceto em casos onde não é possível tipar);
- Não utilize `export default` (exceto em casos onde não é possível tipar ou em casos de libs externas);
- Não utilize `...props` ou `...rest` para componentes, screens ou containers;
