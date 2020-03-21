import React, { Component } from 'react';

class FormatLore extends Component {

    constructor(props) {

        super(props);

    }

    render() {
        const props = this.props;

        var rawLore = props.lore;

        if (rawLore.includes("?")) {
            var rawLore = rawLore.split("?");
        }
        else if (rawLore.includes("§")) {
            var rawLore = rawLore.split("§");
        }

        var outputLore = [];

        rawLore.forEach(lorePart => {
            var mod = lorePart.substring(0, 1);
            var rest = lorePart.substring(1);

            if (mod == "0") {
                mod = "#000000";
            }
            else if (mod == "1") {
                mod = "#0000AA";

            }
            else if (mod == "2") {
                mod = "#00AA00";

            }
            else if (mod == "3") {
                mod = "#00AAAA";

            }
            else if (mod == "4") {
                mod = "#AA0000";

            }
            else if (mod == "5") {
                mod = "#AA00AA";

            }
            else if (mod == "6") {
                mod = "#FFAA00";

            }
            else if (mod == "7") {
                mod = "#AAAAAA";

            }
            else if (mod == "8") {
                mod = "#555555";

            }
            else if (mod == "9") {
                mod = "#5555FF";

            }
            else if (mod == "a") {
                mod = "#55FF55";

            }
            else if (mod == "a") {
                mod = "#00ff00"

            }
            else if (mod == "b") {
                mod = "#55FFFF";

            }
            else if (mod == "c") {
                mod = "#FF5555";

            }
            else if (mod == "d") {
                mod = "#FF55FF";

            }
            else if (mod == "e") {
                mod = "#FFFF55";

            }
            else if (mod == "f") {
                mod = "#FFFFFF";
            }
            else {
                mod = "";
            }

            var jsxLore;
            if (rest.includes("\n\n")) {
                jsxLore = <span style={{ color: mod }}>{rest}<br /><br /></span>;
            }
            else if (rest.includes("\n")) {
                jsxLore = <span style={{ color: mod }}>{rest}<br /></span>;
            }
            else {
                jsxLore = <span style={{ color: mod }}>{rest}</span>;
            }


            outputLore.push(jsxLore);


        });

        return (
            <div>
                {outputLore}
            </div>
        )
    }

}

export default FormatLore;