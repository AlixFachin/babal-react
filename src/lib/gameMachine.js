import { createMachine } from "xstate";

export const gameMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5RQIYFswFkUGMAWAlgHZgB0AEgPYYDEselA7gMIBOkBALvEiAA6VYXApSKJQAD0QBaAOwAmUgBYAzAFYAjCqWyNANnk6NagDQgAnjKUbZpDUqXyAHE902lATlkBfb2dQY2PjEZFS0sJworJwA4uhg4vyCwqKJUgjSWmqkAAweSk5qBh4qKrI5OmaWGfJlpHpe2mrWerIeak6+-vFBhCQU1GB0DIwAymCcnMRQPKACQlOpvOnSnqTqDWoKGjY28rJVMs56ymr5Kjk58vIeDSpdIAFYuH1kTwAK7KOR0TR87BEopwACoEDCsRLzFJiZaIJQnBRnNQ5VxqQyyZF6Q4ZZrrFTXWQqc7yM7OB5PXohUg4dgQLiwUY0sBgIg0ABGuAA1mEErwoYsYZIjqpSM4NPIDK0rvoCtjpGiPHYLko1ETZLInHpmuSei8qU8ADIEABuQwANoJOEaAGa8ubJAVpRCtUganJ6PSOFQaJzqVTYjyKT0VUo6NRFQn3PyPXXBfqGk1DDk4bmDSEOkSCkArRyKVx6d0ksr4+EqbHe0hOYzh1QNDReZw+aMUvX9M0EW0Gy0AEQIsD4ZpQ5hoOFEUyIAFcwHEMOmFpmnTUchpTh6nCVLl52uWOqRVTs8sYXCUlDrAq2yO3Oz2+wOhzQngB5U0QvkZpZCjL4px2HLNd02OUWQ7j++5aJ4pSuJ4Z7PHGZCwBM44zIy7AsuyXI8nO0KLuKioeH+Hi3DsNweIUBwWDIRI5KKrTwjsgYqnoUbRkQlAQHAiQtnBAyzm+84ftmwonE4OgeqUiJMVscpEgitEFjkpTtDYMGUvG8SfGA3xAlhjqwjUioKAYbTorcNymBRGS4aKXhnBo7pouKegqRe1K0vSKHMlm-ILnp4oqLkbSqBKhmlPicrIkouTBp6yKXPs9jOdxCamjpPmfjs-nrlWBbwvs7rkdUhjWWKrQ7J4RROc2savKQV5gF2ES9v2g7VPa-FZis4q5MYoUKb6GIqvI2I+pF8h5GipTuh4WhaIlNUIZM0wMkyLKpQJ6TtKQ01lO0XjHtN5nVNI8haLkniFFW+Hwu6c0hGtHVWPClayAWBiqoShhMXKBaKFoFTwjWUpNr4QA */
createMachine({
    initial: "Home",
    states: {
        Home: {
            on: {
                showCredits: {
                    target: "creditsScreen",
                },
                startGame: {
                    target: "gamePreStart",
                },
                showSettings: {
                    target: "settingsScreen",
                },
            },
        },
        gamePreStart: {
            on: {
                prestartTimer: {
                    target: "gameLive",
                },
            },
        },
        creditsScreen: {
            on: {
                backHome: {
                    target: "Home",
                },
            },
        },
        gameLive: {
            on: {
                lostLife: {
                    target: "lifeLostDisplay",
                },
                backHome: {
                    target: "Home",
                },
            },
        },
        lifeLostDisplay: {
            on: {
                continueGame: {
                    target: "gamePreStart",
                },
                gameOver: {
                    target: "Home",
                },
            },
        },
        settingsScreen: {
            on: {
                backHome: {
                    target: "Home",
                },
            },
        },
    },
    id: "gameMachine",
});