package canvas_test

import (
	"testing"

	keepertest "canvas/testutil/keeper"
	"canvas/testutil/nullify"
	"canvas/x/canvas"
	"canvas/x/canvas/types"
	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.CanvasKeeper(t)
	canvas.InitGenesis(ctx, *k, genesisState)
	got := canvas.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	// this line is used by starport scaffolding # genesis/test/assert
}
