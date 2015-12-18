export default function(){

    this.transition(
        this.toRoute(['books', 'workspaces']),
        this.use('fade'),
        this.reverse('fade')
    );

}
