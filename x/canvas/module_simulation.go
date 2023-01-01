package canvas

import (
	"math/rand"

	"canvas/testutil/sample"
	canvassimulation "canvas/x/canvas/simulation"
	"canvas/x/canvas/types"
	"github.com/cosmos/cosmos-sdk/baseapp"
	simappparams "github.com/cosmos/cosmos-sdk/simapp/params"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/cosmos/cosmos-sdk/x/simulation"
)

// avoid unused import issue
var (
	_ = sample.AccAddress
	_ = canvassimulation.FindAccount
	_ = simappparams.StakePerAccount
	_ = simulation.MsgEntryKind
	_ = baseapp.Paramspace
)

const (
	opWeightMsgCreateCanvas = "op_weight_msg_create_canvas"
	// TODO: Determine the simulation weight value
	defaultWeightMsgCreateCanvas int = 100

	opWeightMsgPaint = "op_weight_msg_paint"
	// TODO: Determine the simulation weight value
	defaultWeightMsgPaint int = 100

	// this line is used by starport scaffolding # simapp/module/const
)

// GenerateGenesisState creates a randomized GenState of the module
func (AppModule) GenerateGenesisState(simState *module.SimulationState) {
	accs := make([]string, len(simState.Accounts))
	for i, acc := range simState.Accounts {
		accs[i] = acc.Address.String()
	}
	canvasGenesis := types.GenesisState{
		Params: types.DefaultParams(),
		// this line is used by starport scaffolding # simapp/module/genesisState
	}
	simState.GenState[types.ModuleName] = simState.Cdc.MustMarshalJSON(&canvasGenesis)
}

// ProposalContents doesn't return any content functions for governance proposals
func (AppModule) ProposalContents(_ module.SimulationState) []simtypes.WeightedProposalContent {
	return nil
}

// RandomizedParams creates randomized  param changes for the simulator
func (am AppModule) RandomizedParams(_ *rand.Rand) []simtypes.ParamChange {

	return []simtypes.ParamChange{}
}

// RegisterStoreDecoder registers a decoder
func (am AppModule) RegisterStoreDecoder(_ sdk.StoreDecoderRegistry) {}

// WeightedOperations returns the all the gov module operations with their respective weights.
func (am AppModule) WeightedOperations(simState module.SimulationState) []simtypes.WeightedOperation {
	operations := make([]simtypes.WeightedOperation, 0)

	var weightMsgCreateCanvas int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgCreateCanvas, &weightMsgCreateCanvas, nil,
		func(_ *rand.Rand) {
			weightMsgCreateCanvas = defaultWeightMsgCreateCanvas
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgCreateCanvas,
		canvassimulation.SimulateMsgCreateCanvas(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgPaint int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgPaint, &weightMsgPaint, nil,
		func(_ *rand.Rand) {
			weightMsgPaint = defaultWeightMsgPaint
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgPaint,
		canvassimulation.SimulateMsgPaint(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	// this line is used by starport scaffolding # simapp/module/operation

	return operations
}
