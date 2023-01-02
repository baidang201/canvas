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

		Canvas: &types.Canvas{
			Width:            88,
			Height:           72,
			RefundDuration:   "38",
			AllowDenomPrefix: "17",
			PriceForPoint:    12,
		},
		StoredColorsList: []types.StoredColors{
			{
				Index: "0",
			},
			{
				Index: "1",
			},
		},
		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.CanvasKeeper(t)
	canvas.InitGenesis(ctx, *k, genesisState)
	got := canvas.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	require.Equal(t, genesisState.Canvas, got.Canvas)
	require.ElementsMatch(t, genesisState.StoredColorsList, got.StoredColorsList)
	// this line is used by starport scaffolding # genesis/test/assert
}
