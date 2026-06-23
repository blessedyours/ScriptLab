const weapons = {
    "Desert Eagle": 24,
    "MP5": 29,
    "AK47": 30,
    "M4": 31,
    "Shotgun": 25,
    "Tec9": 32
};

function buildHeader(framework,name)
{
    switch(framework)
    {
        case "zcmd":
            return `CMD:${name}(playerid, params[])\n{`;

        case "pawncmd":
            return `COMMAND:${name}(playerid, params[])\n{`;

        default:
            return `public ${name}(playerid, params[])\n{`;
    }
}

function updateFields()
{
    const type =
    document.getElementById("commandType").value;

    const container =
    document.getElementById("extraFields");

    if(type === "giveweapon")
    {
        container.innerHTML = `
        <select id="weapon">
            <option>Desert Eagle</option>
            <option>MP5</option>
            <option>AK47</option>
            <option>M4</option>
            <option>Shotgun</option>
            <option>Tec9</option>
        </select>

        <input
        id="ammo"
        type="number"
        value="500"
        placeholder="Ammo">
        `;
    }
    else
    {
        container.innerHTML = "";
    }
}

function generateCode()
{
    const framework =
    document.getElementById("framework").value;

    const type =
    document.getElementById("commandType").value;

    const cmd =
    document.getElementById("cmdName").value;

    const admin =
    document.getElementById("adminLevel").value;

    let code =
    buildHeader(framework,cmd);

    code += `

    if(PlayerInfo[playerid][Admin] < ${admin})
        return SendClientMessage(playerid,-1,"No autorizado.");

`;

    switch(type)
    {
        case "giveweapon":

            const weapon =
            document.getElementById("weapon").value;

            const ammo =
            document.getElementById("ammo").value;

            const weaponid =
            weapons[weapon];

            code += `
    new targetid;

    GivePlayerWeapon(
        targetid,
        ${weaponid},
        ${ammo}
    );
`;
        break;

        case "revive":

            code += `
    SetPlayerHealth(playerid,100.0);
`;
        break;

        case "kill":

            code += `
    SetPlayerHealth(playerid,0.0);
`;
        break;

        case "health":

            code += `
    SetPlayerHealth(playerid,100.0);
`;
        break;

        case "armour":

            code += `
    SetPlayerArmour(playerid,100.0);
`;
        break;

        case "repair":

            code += `
    RepairVehicle(GetPlayerVehicleID(playerid));
`;
        break;

        case "destroyvehicle":

            code += `
    DestroyVehicle(GetPlayerVehicleID(playerid));
`;
        break;

        case "money":

            code += `
    GivePlayerMoney(playerid,5000);
`;
        break;

        case "setmoney":

            code += `
    ResetPlayerMoney(playerid);
    GivePlayerMoney(playerid,5000);
`;
        break;

        case "kick":

            code += `
    Kick(playerid);
`;
        break;

        case "ban":

            code += `
    Ban(playerid);
`;
        break;
    }

    code += `

    return 1;
}
`;

    document.getElementById("output").value = code;
}

function copyCode()
{
    navigator.clipboard.writeText(
        document.getElementById("output").value
    );

    alert("Code copied!");
}

updateFields();