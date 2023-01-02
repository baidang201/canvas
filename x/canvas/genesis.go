package canvas

import (
	"canvas/x/canvas/keeper"
	"canvas/x/canvas/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// InitGenesis initializes the module's state from a provided genesis state.
func InitGenesis(ctx sdk.Context, k keeper.Keeper, genState types.GenesisState) {
	// Set if defined
	if genState.Canvas != nil {
		k.SetCanvas(ctx, *genState.Canvas)
	}
	// Set all the storedColors
	for _, elem := range genState.StoredColorsList {
		k.SetStoredColors(ctx, elem)
	}
	// this line is used by starport scaffolding # genesis/module/init
	k.SetParams(ctx, genState.Params)
}

// ExportGenesis returns the module's exported genesis
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	genesis := types.DefaultGenesis()
	genesis.Params = k.GetParams(ctx)

	// Get all canvas
	canvas, found := k.GetCanvas(ctx)
	if found {
		genesis.Canvas = &canvas
	}
	genesis.StoredColorsList = k.GetAllStoredColors(ctx)
	// this line is used by starport scaffolding # genesis/module/export

	return genesis
}
