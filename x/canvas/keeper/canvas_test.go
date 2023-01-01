package keeper_test

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"

	keepertest "canvas/testutil/keeper"
	"canvas/testutil/nullify"
	"canvas/x/canvas/keeper"
	"canvas/x/canvas/types"
)

func createTestCanvas(keeper *keeper.Keeper, ctx sdk.Context) types.Canvas {
	item := types.Canvas{}
	keeper.SetCanvas(ctx, item)
	return item
}

func TestCanvasGet(t *testing.T) {
	keeper, ctx := keepertest.CanvasKeeper(t)
	item := createTestCanvas(keeper, ctx)
	rst, found := keeper.GetCanvas(ctx)
	require.True(t, found)
	require.Equal(t,
		nullify.Fill(&item),
		nullify.Fill(&rst),
	)
}

func TestCanvasRemove(t *testing.T) {
	keeper, ctx := keepertest.CanvasKeeper(t)
	createTestCanvas(keeper, ctx)
	keeper.RemoveCanvas(ctx)
	_, found := keeper.GetCanvas(ctx)
	require.False(t, found)
}
