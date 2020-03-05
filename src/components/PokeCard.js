import React from 'react'
import {Card, Image, Icon, Button, Modal, Header} from 'semantic-ui-react'

const PokeCard = (props) => (
                    <Card >   
                    <Image src={props.pokemon.sprites.frontimg} wrapped ui={false} />
                    <Card.Content>
                    <Card.Header>{props.pokemon.name}</Card.Header>
                    <Card.Meta>
                        <span className='date'>Type: {props.pokemon.poke_type}</span>
                    </Card.Meta>
                    <Card.Description>
                        Moves: {props.pokemon.moves[0].name}, {props.pokemon.moves[1].name}, {props.pokemon.moves[2].name}, {props.pokemon.moves[3].name}
                    </Card.Description>
                    <Button onClick={props.conditionalRender === 'pickpoke' ? () => props.pickPokeTeamAdd(props.pokemon) : () => props.profilePokeTeamAdd(props.pokemon) } animated>
                    <Button.Content visible>Add to team</Button.Content>
                    <Button.Content hidden>
                    <Icon name='check' />
                    </Button.Content>
                    </Button>
                    <Modal trigger={<Button style={{down: '1px'}}>See more info</Button>} closeIcon onClose = {props.renderIndepthCard} size='small'>
                    <Modal.Header>{props.pokemon.name}</Modal.Header>
                    <Modal.Content image>
                    <Image style={{width: '100px'}} wrapped size='medium' src={props.pokemon.sprites.frontimg} />
                    <Modal.Description>
                        <Header>Type: {props.pokemon.poke_type}</Header>
                        <Header>Moves</Header>
                        {props.pokemon.moves.map(move => {
                            return (
                                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                                    <h4> {move.name} </h4>
                                    <p> Power: {move.power} </p>
                                    <p> Accuracy: {move.accuracy} </p>
                                    <p> Type: {move.type} </p>
                                </div>
                            )
                        })}
                        <Header>Stats</Header>
                        {props.pokemon.stats.map(stat => {
                            return (
                                <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                                    <h4>{stat.name}: {stat.value}</h4>
                                </div>
                            )
                        })}
                    </Modal.Description>
                    </Modal.Content>
                    </Modal>
                    </Card.Content>
                    <Card.Content extra>
                    </Card.Content>
                </Card>   
);

export default PokeCard