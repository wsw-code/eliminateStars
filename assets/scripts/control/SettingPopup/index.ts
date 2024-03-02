import { _decorator, Component, find, Node } from 'cc';
import { UINode } from '../../../ui-node';
const { ccclass, property } = _decorator;

@ccclass('SettingPopup')
export class SettingPopup extends Component {



    protected onLoad(): void {
        UINode.inst.soundBtn = find('container/Audio/Music',this.node);

        console.log(UINode.inst.soundBtn)


        console.log()
    }


}


