export const CON_POSTS_REQUEST = 'CON_POSTS_REQUEST'
export const fetchConPostsRequest = () =>({
    type: CON_POSTS_REQUEST
})

export const CON_POSTS_SUCCESS = 'CON_POSTS_SUCCESS'
export const fetchConPostsSuccess = (posts) =>({
    type: CON_POSTS_SUCCESS,
    conPosts: [{
        title: "YMCA",
        quote: "The new Nafta is really bad!"
                },
        {
           title: "Fairtrade Fred",
           quote: "Lorem ipsum dolor sit amet, corpora copiosae reprimique eum cu. Qui eu gubergren instructior, mel at iudico nusquam consequat. Eu minim rationibus mea, quodsi corrumpit te mel. Ad feugiat consequuntur quo, in vis lorem altera iisque. Est eu brute inimicus intellegebat. Ne cum apeirian senserit salutatus, sint epicuri appellantur has id." 
        },
        {
            title: "Equal Exchange",
            quote: "Corpora copiosae reprimique eum cu. Qui eu gubergren instructior, mel at iudico nusquam consequat. Eu minim rationibus mea, quodsi corrumpit te mel. Ad feugiat consequuntur quo, in vis lorem altera iisque. Est eu brute inimicus intellegebat. Ne cum apeirian senserit salutatus, sint epicuri appellantur has id." 
        },
        {
            title: "Something Union",
            quote: "Eum cu. Qui eu gubergren instructior, mel at iudico nusquam consequat. Eu minim rationibus mea, quodsi corrumpit te mel. Ad feugiat consequuntur quo, in vis lorem altera iisque. Est eu brute inimicus intellegebat. Ne cum apeirian senserit salutatus, sint epicuri appellantur has id." 
        },
        {
            title: "Something else Union",
            quote: "Lorem ipsum dolor sit amet, corpora copiosae reprimique eum cu. Qui eu gubergren instructior, mel at iudico nusquam consequat. Eu minim rationibus mea, quodsi corrumpit te mel. Ad feugiat consequuntur quo, in vis lorem altera iisque. Est eu brute inimicus intellegebat. Ne cum apeirian senserit salutatus, sint epicuri appellantur has id." 
        },

]
})

export const fetchConPosts = () => dispatch =>{
    console.log("triggered")
    dispatch(fetchConPostsSuccess())
}