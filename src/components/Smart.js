import React, { Component } from 'react';
import { Container, Table } from "semantic-ui-react";

class Smart extends Component {

    render() {



        return (
            <Container className="landing disp-flex" style={{ flexDirection: "column", marginTop: "50px" }}>
                <h1>So What is <span className="main-color">Smart Search</span>?</h1>
                <div>
                    <p>Smart search is a feature that kicks in when you search for items' abbreviations instead of their whole name.</p>
                    <p>So For example instead of writing "Aspect of the end" You can just write "aote" and it will be automagically converted to Aspect of the End!</p>
                    <p>This feature also works if you search for specific reforges like "Spicy aote" We also added support for armor, so for example if you searched for godly ender armor it will list all the godly ender chestplates, helmets, etc. auctions</p>
                    <p>And to make it even easier we added a smart search for every single dragon armor piece! so if you try searching for "godly stda" (strong dragon armor) it will list all the godly strong  chestplates, helmets, boots and leggings all together! <span style={{ fontSize: "10px" }}>and of course ending in a couple of minutes (;</span></p>
                    <p>Join the discord below to get notified with cool features added like this!</p>
                </div>

                <div style={{ marginTop: "25px" }}>
                    <p className="main-color">Smart Search List: </p>
                    <Table basic='very' celled inverted collapsing>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Abbreviation</Table.HeaderCell>
                                <Table.HeaderCell>Equivalent</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>

                                    AOTE
                            </Table.Cell>
                                <Table.Cell>Aspect of the End</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    AOTD
                            </Table.Cell>
                                <Table.Cell>Aspect of the Dragons</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>

                                    LS

                            </Table.Cell>
                                <Table.Cell>Leaping Sword</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>

                                    SDA

                            </Table.Cell>
                                <Table.Cell>Superior dragon armor</Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.Cell>

                                    UDA

                            </Table.Cell>
                                <Table.Cell>Unstable dragon armor</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>

                                    YDA

                            </Table.Cell>
                                <Table.Cell>Young dragon armor</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>

                                    WDA

                            </Table.Cell>
                                <Table.Cell>Wise dragon armor</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>

                                    ODA

                            </Table.Cell>
                                <Table.Cell>Old dragon armor</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>

                                    PDA

                            </Table.Cell>
                                <Table.Cell>Protector dragon armor</Table.Cell>
                            </Table.Row>

                        </Table.Body>
                    </Table>

                    <p class="pb-0 mb-0">This list though still needs a lot more join the discord below and suggest some :)</p>
                    <br />
                </div>


                <iframe style={{ margin: "30px 0" }} src="https://discordapp.com/widget?id=646838200501010432&theme=dark" width="500" height="500" allowtransparency="true" frameborder="0"></iframe>
            </Container>
        )
    }
    ;
}

export default Smart;
