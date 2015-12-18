export default function(){
    this.transition(
        this.hasClass('navbar-item'),
        this.toValue(true),
        this.use('toUp'),
        this.reverse('toDown')
    );

    this.transition(
        this.toRoute(['books', 'workspaces']),
        this.use('fade'),
        this.reverse('fade')
    );

}
